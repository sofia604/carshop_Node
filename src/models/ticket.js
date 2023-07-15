const TicketData = require('../schemas/ticket');

function saveTicket(data, cb) {
    new TicketData(data)
    .save()
    .then((ticketdata) => {
        return cb(null, ticketdata);
    }).catch((error)=> {
        console.log('Error:', error);
        return cb(error);
    })
}

function getTickets(cb) {
    TicketData.find({})
    .then((elems) => {
        return cb(null, elems);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
}

function getTicketsbyUser(user,cb) {
    TicketData.find({user:user})
    .then((elems) => {
        return cb(null, elems);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
}

function getTicketbyId(_id,cb) {
    TicketData.findById({_id})
    .then((elems) => {
        return cb(null, elems);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
}

function deleteTickets(id, cb) {
    TicketData.findOneAndRemove({ _id: id})
    .then((elem) => {
        return cb(null, elem);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
}

async function updateTicket(id,data){
    try{
        const ticket = await TicketData.findByIdAndUpdate( id,data,{new:true});
        return ticket;
    }catch(error){
        return error;
    }

}

exports.saveTicket = saveTicket;
exports.getTickets = getTickets;
exports.deleteTickets = deleteTickets;
exports.getTicketsbyUser = getTicketsbyUser;
exports.getTicketbyId = getTicketbyId;
exports.updateTicket = updateTicket;