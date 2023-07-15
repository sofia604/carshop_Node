const mongoose = require('mongoose');

const password = 'vvPnEgQ5AZnTrdxB';

const url = `mongodb+srv://sespana22:vvPnEgQ5AZnTrdxB@bootcamp.dqfxv9k.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(url)
.then(() => {
    console.log('Database connected!');

})
.catch((error) => {
    console.log('DB Error:', error);
});

