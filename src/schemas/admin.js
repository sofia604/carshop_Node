const mongoose = require('mongoose');

const adminDataSchema = mongoose.Schema({
    first_name: {type: String, require: true},
    last_name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    role: {type: String, require: true}
},{timestamps:true});

adminDataSchema.set('toJSON', {
    transform: (document, returnedOject) => {
        returnedOject.id = document._id
        delete returnedOject._id;
    } 
})

const AdminData = new mongoose.model('Admin', adminDataSchema);

module.exports = AdminData;