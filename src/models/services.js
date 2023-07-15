const ServiceData = require('../schemas/services');

function getServices(cb) {
    ServiceData.find({})
    .then((services) => {
       return cb(null, services);
    })
    .catch((error) => {
        console.log('Error:', error); 
        return cb(error);
    });
}

function saveServices(data, cb) {
    new ServiceData(data)
    .save()
    .then((datacli) => {
        return cb(null, datacli);
    }).catch((error)=> {
        console.log('Error:', error);
        return cb(error);
    })
}

exports.getServices = getServices;
exports.saveServices = saveServices;