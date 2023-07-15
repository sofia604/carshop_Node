const express = require ('express');
const bcrypt = require('bcryptjs');
const AccessToken = require("../../middlewares/jwt") 
const AdminData = require('../../models/admin')
const TicketData = require('../../models/ticket');
const authRequired = require("../../middlewares/validateAdminToken");

const router = new express.Router();


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
    returnres.json({ message: 'Logout successfully' });
})

router.put('/ticket/:id',authRequired.authRequired,(req,res)=>{
    if (!req.user) {
        return res.redirect('/login');
    }
    const { id } = req.params;
    const body = req.body;
    console.log(body)
    const ticket = TicketData.updateTicket(id,body)
    if(!ticket){
        return res.status(404).json({message:"Task not foound"})
    }
    res.json(ticket)
})

module.exports = router;