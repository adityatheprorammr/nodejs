const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')








app.use(express.json());

app.use(cookieParser())



// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');


app.use('/api/v1', products)
app.use('/api/v1', auth)

app.use('/api/v1', order)




// Middleware to handle errors
app.use((req,res,next)=>{
    res.status(404)
    res.send({
        error:"not found"
    })
})
app.use((err,req,res,next)=>{
    res.status(err.status||500)
    res.send({
        error:{
            status:err.status||500,
            message:err.message
        }
    })
})
module.exports = app