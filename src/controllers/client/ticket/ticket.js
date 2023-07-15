const express = require ('express');
const TicketData = require('../../../models/ticket')
const ServiceData = require('../../../models/services')
const authRequired = require("../../../middlewares/validateToken.js")
const router = new express.Router();

router.get('/service',authRequired.authRequired,(req,res)=>{
    if (!req.user) {
        return res.redirect('/login');
    }
    return ServiceData.getServices((error,services)=>{
        if (error){
            return res.status(500).json({code: 'UE', message: 'Unknown Error'})
        }
        res.json(services)
    })
})

router.post('/ticket',authRequired.authRequired,(req,res)=>{
    if (!req.user) {
        return res.redirect('/login');
    }
    const body = req.body;
    body.user = req.user.id;
    console.log(req.user)
    return TicketData.saveTicket(body, (error, object) => {
        if (error){
            return res.status(500).json({code: 'UE', message: 'Unknown Error'})
        }
        return res.json({ code: 'OK', message: 'Save ticket successfully!', data: object.toJSON()})
    })
});

router.get('/ticket',authRequired.authRequired,(req,res)=>{
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

router.get('/tickets',authRequired.authRequired,(req,res)=>{
    if (!req.user) {
        return res.redirect('/login');
    }
    const user = req.user.id;
    return TicketData.getTicketsbyUser(user,(error, elems)=> {
        if (error) {
            return res.status(404).json({ code: 'NF', message: 'Ticket not found'})
        }
        res.json(elems);
    });
})


router.get('/ticket/:id',authRequired.authRequired,(req,res)=>{
    if (!req.user) {
        return res.redirect('/login');
    }
    const { id } = req.params;
    return TicketData.getTicketbyId(id,(error, elems)=> {
        if (error) {
            return res.status(404).json({ code: 'NF', message: 'Ticket not found'})
        }
        res.json(elems);
    });
})

router.put('/ticket/:id', authRequired.authRequired,(req,res)=>{
    if (!req.user) {
        return res.redirect('/login');
    }
    const { id } = req.params;
    const body = req.body;
    const ticket = TicketData.updateTicket(id,body)
    if(!ticket){
        return res.status(404).json({message:"Task not foound"})
    }
    res.json(ticket)
})

module.exports = router;