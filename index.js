const express = require('express');
const connect = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const userRoute = require('./routes/admin/UserRoute');
const BannerRoute = require('./routes/admin/BannerRoute');
const categoryRoute = require('./routes/admin/CategoryRoute');
const productRoute = require('./routes/admin/ProductRoute');
const orderRoute = require('./routes/admin/OrderRoute');
const postRoute = require('./routes/admin/PostRoute');
const couponRoute = require('./routes/admin/CouponRoute');
const bodyParser = require('body-parser');
const frontCate = require('./routes/front/CategoryRoute');
const frontProduct = require('./routes/front/ProductRoute');
const frontPost = require('./routes/front/PostRoute');
const frontUser = require('./routes/front/UserRoute');
const frontBanner = require('./routes/front/BannerRoute');
const frontPayment = require('./routes/front/PaymentRoute');


const app = express();//Connect express
connect();//Connect Database
//cors
app.use(express.static('public'));//Static Folder Connection
app.use(bodyParser.json());
app.use(cors());
app.use('/', userRoute);
app.use('/', BannerRoute);
app.use('/', categoryRoute);
app.use('/', productRoute);
app.use('/', orderRoute);
app.use('/', postRoute);
app.use('/', couponRoute);
app.use('/front', frontCate);
app.use('/front', frontProduct);
app.use('/front', frontPost);
app.use('/front', frontUser);
app.use('/front', frontBanner);
app.use('/front', frontPayment);


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, ()=>{
    console.log('Your app is running on port 5000');
});
