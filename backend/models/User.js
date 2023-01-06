const mongoose = require("mongoose");

const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "please enter name"],
    },

    avatar : {
        public_id : String,
        url : String,
    },
    
    email :{
        type : String,
        required : [true , "please enter email"],
        unique: [true, " email already exist"],
    },
    password : {
        type : String,
        required : [true , "please enter password"],
        minlength : [6 , "atleast 6 char. required"],
        select : false,  // jab bhi user ka data access kre to password ko chod ke sab mil jaye
    },

    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post",
        }
    ],

    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ],
    following : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ],
    resetPasswordToken : String,
    expiryRPT : Date,

});


userSchema.pre('save' , async function (next){
    if(this.isModified("password")){                  // essa edit krna ka bad hashed password vapis hash nhi hoga
        this.password = await bcrypt.hash(this.password , 10);
    }

    next() ;   // agr password hashed ni h too ye kam ni krega

});


userSchema.methods.matchPassword = async function(password) {
    // console.log(password , this.password);

    return await bcrypt.compare(password , this.password)       // this.password userSchema ka pssword h
}

userSchema.methods.generateToken = async function(){
    return jwt.sign(  {_id : this._id} , process.env.JWT_SECRET) 
}

userSchema.methods.getresetPasswordToken = function(){

    //token generate
    const rp_token = crypto.randomBytes(20).toString('hex');   // jo mail ma bheja

    this.resetPasswordToken = crypto.createHash('sha256').update(rp_token).digest('hex');  // token ko secure krke DB ma dala

    this.expiryRPT = Date.now() + 10*60*1000 ; // 10 min ma expire
    
    return rp_token; // bna hash wala h ye
}



module.exports = mongoose.model("User" , userSchema );