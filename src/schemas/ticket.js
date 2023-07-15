const mongoose = require('mongoose');

const TicketDataSchema = mongoose.Schema({
    firs_name: {type: String, require: true},
    last_name: {type: String, require: true},
    email: {type: String, require: true},
    phone:{type: String, require: true},
    type_id: {type: String, require: true},
    id_number: {type: String, require: true},
    brand: {type: String, require: true},
    model: {type: String, require: false},
    plate: {type: String, require: true},
    tankLevel:{type: String, require: true},
    info: {type: String, require: false},
    services:  {
        type:{
            services: {type: [String],required: true},
            worktime: {type: String, require: false},
            date: {type: String, require: true},
            time:{type: String, require: true},
        }
    },
    status:{type: String, require: true},
    user: {type: String, require:true}
});

TicketDataSchema.set('toJSON', {
    transform: (document, returnedOject) => {
        returnedOject.id = document._id
        delete returnedOject._id;
    } 
})

const TicketData = new mongoose.model('ticketData', TicketDataSchema);

module.exports = TicketData;