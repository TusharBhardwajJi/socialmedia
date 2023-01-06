const express = require ('express');
const app = express();
const cookieParser = require('cookie-parser');
const path  = require('path');

if(process.env.NODE_ENV !== "prodeuction"){
    require("dotenv").config({path : "backend/config/config.env"});   // port - 4000 mila
}

app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({limit : '50mb',extended:true}));

app.use(cookieParser()); // auth (islogedin check krte hua jo hum token le rhe h oske liya)


const postroute = require('./routes/post');
app.use('/api/v1' , postroute);

const userroute = require('./routes/user');
app.use('/api/v1' , userroute);

const newP = path.join(__dirname , '../frontend/build/index.html');
console.log(newP);


app.get('/*' , (req , res) => {
    app.use(express.static(newP));
    res.sendFile(path.resolve(newP))
    console.log(__dirname);
})

// localhost:4000/api/vi/post/upload  link is this type

module.exports= app;