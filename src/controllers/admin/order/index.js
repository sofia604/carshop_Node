const express = require ('express');
const ServiceData = require('../../../models/services.js');
const TicketData = require('../../../models/ticket.js');
const authRequired = require("../../../middlewares/validateAdminToken.js");
const roleRequired = require("../../../middlewares/validateAdmin.js");
const router = new express.Router();


router.get('/services',authRequired.authRequired,(req,res)=>{
    if (!req.user) {
        return res.redirect('/login');
    }
    return ServiceData.getServices((error,services)=>{
        if (error){
            return res.status(500).json({code: 'UE', message: 'Unknown Error'})
        }
        res.json(services)
    })
});

router.post('/services',authRequired.authRequired,(req,res)=>{
    if (!req.user) {
        return res.redirect('/login');
    }
    const body = req.body;
    console.log('Data:', body);
    return ServiceData.saveServices(body, (error, object) => {
        if (error){
            return res.status(500).json({code: 'UE', message: 'Unknown Error'})
        }
        return res.json({ code: 'OK', message: 'Saved successfully!', data: object.toJSON()})
    })
});

router.get('/',authRequired.authRequired,(req,res)=>{
    console.log(req.user);
    if (!req.user) {
        return res.redirect('/login');
    }
    return TicketData.getTickets((error, elems)=> {
        if (error) {
            return res.status(404).json({ code: 'NF', message: 'Ticket not found'})
        }
        res.json(elems);
    });
})

router.delete('/ticket/:id',authRequired.authRequired,roleRequired.roleRequired,(req,res)=>{
    if (!req.user) {
        return res.redirect('/login');
    }
    console.log('Deleting:', req.params);
    const { id } = req.params; 
    TicketData.deleteTickets(id, (error, b) => {
        if (error) {
            return  res.status(500).json({ code: 'UE', message: 'Unkwown error'})
        }
        res.json({ code: 'OK', message: 'Deleted successfully!', data: b.toJSON()})
    });
});

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