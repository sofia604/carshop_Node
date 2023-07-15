const express = require ('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AccessToken = require("../../../middlewares/jwt.js") 
const AdminData = require('../../../models/admin.js')
const ClientData = require('../../../models/client.js')
const authRequired = require("../../../middlewares/validateAdminToken.js");
const { TOKEN_SECRET } = require('../../../../config.js');

const router = new express.Router();

router.get('/verify', async function (req,res){
  const {token} = req.cookies;
  if(!token) return res.status(401).json({message:"Unauthorized"}) 
  jwt.verify(token,TOKEN_SECRET, async (err,user)=>{
      if(err) return res.status(401).json({message:"Unauthorized"});
      if (user.role !== 'user') {
        return AdminData.getAdminData(user.id, (error, admin) => {
            if (error) return res.status(401).json({ message: "Unauthorized" });
                return res.json({
                email: admin._id,
                role: admin.role,
            });
        });
      }else {
        return ClientData.getClientData(user.id, (error, client) => {
          if (error) return res.status(401).json({ message: "Unauthorized" });
          return res.json({
            email: client.email,
            role: client.role,
          });
        });
      }
    });
  });

router.post('/register', async function (req, res){
    const body = req.body;
    body.password = await bcrypt.hash(body.password,10);
    const token = await AccessToken.createAccessToken({id:[ body.email, body.role]})
    return AdminData.saveAdminData(body, (error, object) => {
        if (error){
            return res.status(500).json({code: 'UE', message: 'Unknown Error'})
        }
        res.cookie ("token",token)
        return res.json({ code: 'OK', message: 'Register successfully!', data: object.toJSON()})
    })
})


router.post('/login', async function (req, res){
    const {email,password} = req.body;
    return AdminData.getAdminData(email, (error, user) => {
        if(error) {
            return  res.status(500).json(['Email or password is incorrect!']);
        }
        bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            AccessToken.createAccessToken({ id: email, role: user.role })
            .then((token) => {
                res.cookie ("token",token);                
                console.log('Success:', user);
                return res.json({ code: 'OK', message: 'Login successfully!', data: user.toJSON()})
            })
            .catch((error) => {
                console.log('Error:', error);
            });
          }else {
            return  res.status(500).json(['Email or password is incorrect!']);
          }
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    })
})

router.get('/logout', async function (req, res){
  res.cookie("token","",{
      expires: new Date(0)
  })
  //res.redirect('/'); 
  return res.json({ message: 'Logout successfully' });
})


module.exports = router;