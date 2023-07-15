const mongoose = require('mongoose');

const servicesSchema = mongoose.Schema({
    name: {type: String, require: true},
    price: {type: String, require: false},
    time: {type: String, require: true},
    availability:{type: Boolean, require: true},
});

servicesSchema.set('toJSON', {
    transform: (document, returnedOject) => {
        returnedOject.id = document._id
        delete returnedOject._id;
    } 
})

const ServiceData = new mongoose.model('srvData', servicesSchema);
module.exports = ServiceData;