const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('useFindAndModify', false);

module.exports = connect = async() =>{
    try {
        const response = await mongoose.connect(process.env.URL, {useUnifiedTopology: true, useNewUrlParser: true});
        console.log('Connection created successfully');
    } catch (error) {
        console.log(error);
    }
}