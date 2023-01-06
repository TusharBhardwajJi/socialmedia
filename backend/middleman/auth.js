/// check user is loged in or not then only create post

const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.islogedIn = async (req, res ,next) => {

    try {
        
        const {token} = req.cookies;

        // console.log(token , req.cookies.token)

        if(!token){
            return res.status(401).json({
                message : "please login first",
            });
        }

        const decoded = await jwt.verify(token , process.env.JWT_SECRET);  // token verify 


        //req.user ma user ka sara data save
        req.user = await User.findById(decoded._id);    // decode data ma _id h kyuki gnrate token krte time osme hmne sirf id dale h
        next();

    } catch (error) {
        res.status(500).json({
            message : error.message,
            
        })
    }
}