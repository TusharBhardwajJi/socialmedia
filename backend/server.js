const app = require('./app');
const cloudinary = require("cloudinary");

const {connectDB} = require('./config/database'); 
connectDB(); // call func to connect DB

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_PAI_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


app.listen(process.env.PORT, ()=>{
    console.log(`server running on ${process.env.PORT} `)
})