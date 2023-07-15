const express = require ('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AccessToken = require("../../../middlewares/jwt.js") 
const ClientData = require('../../../models/client.js')
const { TOKEN_SECRET } = require('../../../../config.js');

const router = new express.Router();



router.get('/verify', async function (req,res){
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message:"Unauthorized"}) 
    jwt.verify(token,TOKEN_SECRET, async (err,user)=>{
        if(err) return res.status(401).json({message:"Unauthorized"});
        return ClientData.getClientData(user.id,(error, user) => {
            if(error) return res.status(401).json({message:"Unauthorized"});
            return res.json({
                email: user._id,
            })
        });
        
    })
})


router.post('/register', async function (req, res){
    const body = req.body;
    body.password = await bcrypt.hash(body.password,10);
    const token = await AccessToken.createAccessToken({id:[ body.email, body.role]})
    return ClientData.saveClientData(body, (error, object) => {
        if (error){
            return res.status(500).json({code: 'UE', message: 'Unknown Error'})
        }
        res.cookie ("token",token)
        return res.json({ code: 'OK', message: 'Register successfully!', data: object.toJSON()})
    })
})


router.post('/login', async function (req, res){
    const {email,password} = req.body;
    return ClientData.getClientData(email, (error, user) => {
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
    return res.redirect('/');
})


module.exports = router;