const express = require('express');
const morgan = require('morgan');
const path = require('path');
const DB = require('./db.js');
const engine = require('ejs-locals');
const AdminOrder = require("./controllers/admin/order/index.js");
const AdminAuth = require("./controllers/admin/auth/index.js");
const ClientAuth = require("./controllers/client/auth/index.js");
const ClientTicket = require("./controllers/client/ticket/ticket.js");
const Movil = require("./controllers/movil/order.js")
const cookie = require("cookie-parser");
const cors = require("cors")

const app = express();


//Setings

app.use(express.json());
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//Midelwares
app.use(morgan('dev'));
app.use(cookie())

//Routes
app.use('/admin',AdminOrder);
app.use('/admin',AdminAuth);
app.use('/api',ClientAuth);
app.use('/api',ClientTicket)
app.use('/mov',Movil)


//static files
app.use(express.static(path.join(__dirname, "build")));
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname, "build",'index.html'))
});

app.listen(4000,()=>{
    console.log("server on port 4000");
})