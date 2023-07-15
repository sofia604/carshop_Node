const mongoose = require('mongoose');

const clientDataSchema = mongoose.Schema({
    first_name: {type: String, require: true},
    last_name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    role: {type: String, default: 'user'}
},{timestamps:true});

clientDataSchema.set('toJSON', {
    transform: (document, returnedOject) => {
        returnedOject.id = document._id
        delete returnedOject._id;
    } 
})

const ClientData = new mongoose.model('User', clientDataSchema);

module.exports = ClientData;

