const AdminData = require('../schemas/admin');

function getAdminData(email,cb) {
    AdminData.findOne({email})
  .then((datacli) => {
     return cb(null, datacli);
  })
  .catch((error) => {
      console.log('Error:', error); 
      return cb(error);
  });
}

function saveAdminData(data, cb) {
    new AdminData(data)
    .save()
    .then((datacli) => {
        return cb(null, datacli);
    }).catch((error)=> {
        console.log('Error:', error);
        return cb(error);
    })
}



exports.getAdminData = getAdminData;
exports.saveAdminData = saveAdminData;