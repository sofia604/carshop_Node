const ClientData = require('../schemas/client');

function getClientData(email,cb) {
  ClientData.findOne({email})
  .then((datacli) => {
     return cb(null, datacli);
  })
  .catch((error) => {
      console.log('Error:', error); 
      return cb(error);
  });
}

function getClientById(id,cb){
  ClientData.findById(id).then((datacli) => {
    return cb(null, datacli);
 })
 .catch((error) => {
     console.log('Error:', error); 
     return cb(error);
 });
}


function saveClientData(data, cb) {
    new ClientData(data)
    .save()
    .then((datacli) => {
        return cb(null, datacli);
    }).catch((error)=> {
        console.log('Error:', error);
        return cb(error);
    })
}



exports.getClientData = getClientData;
exports.saveClientData = saveClientData;
exports.getClientById = getClientById;
