const express = require('express');
const connect = require('./config/db');
require('dotenv').config();
const userRoute = require('./routes/admin/UserRoute');
const categoryRoute = require('./routes/admin/CategoryRoute');
const productRoute = require('./routes/admin/ProductRoute');
const postRoute = require('./routes/admin/PostRoute');
const bodyParser = require('body-parser');
const frontCate = require('./routes/front/CategoryRoute');
const fronProduct = require('./routes/front/ProductRoute');


const app = express();//Connect express
connect();//Connect Database
//cors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    next();
});

app.use(express.static('public'));//Static Folder Connection
app.use(bodyParser.json());
app.use('/', userRoute);
app.use('/', categoryRoute);
app.use('/', productRoute);
app.use('/', postRoute);
app.use('/front', frontCate);
app.use('/front', fronProduct);


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, ()=>{
    console.log('Your app is running on port 5000');
});
