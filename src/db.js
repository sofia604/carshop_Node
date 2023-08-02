const mongoose = require('mongoose');


const url = "URL Database"


mongoose.connect(url)
.then(() => {
    console.log('Database connected!');

})
.catch((error) => {
    console.log('DB Error:', error);
});

