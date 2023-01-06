const Post = require("../models/Post");
const User = require("../models/User");
const {send_Email} = require('../middleman/sendEmail')
const crypto = require('crypto');
const cloudinary = require('cloudinary');

exports.register = async(req, res) =>{

    try {
        
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder:"avatar",
        });

        const {image , name ,email ,password} = req.body;

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({success : false,message : "user already exists"}) 
        }

        user = await User.create({name, avatar : {public_id : myCloud.public_id , url : myCloud.secure_url} , email , password });
        
        // res.status(201).json({success : true , user});

        const token = await user.generateToken();

        res.status(201).cookie("token" , token , {
            expires : new Date(Date.now() + (90*24*60*60*1000)),  // 30din 24h .....1000milisec   ka bad token expire hoga
            httpOnly : true,
        } ).json({
            success : true,
            user,
            token,
            message : "User Registered ssfly"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message,
        });
    }

}

exports.login= async (req ,res) => {
    try {

        const {email , password} = req.body;

        const user = await User.findOne({email}).select("+password").populate("posts followers following");

        if(!user){
            return res.status(400).json({
                success : false,
                message : "user not found"
            })
        }
        
        const isMatch = await user.matchPassword(password);   // controller -> USER  ka funtion ma gya ye password
        
        if(!isMatch){
            return res.status(400).json({
                success : false,
                message : "incorrect password"
            })
        }
        


        // REGISTER KA SATH KI LOGIN HO JYE ES LIYA OOPER PATE KR DIYA CODE KO  

        const token = await user.generateToken();

        res.status(201).cookie("token" , token , {
            expires : new Date(Date.now() + (90*24*60*60*1000)),  // 30din 24h .....1000milisec   ka bad token expire hoga
            httpOnly : true,
        } ).json({
            success : true,
            user,
            token
        })

        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}


exports.logout = async (req ,res) => {

    try {

        res.status(200).cookie('token' , null , {expires : new Date(Date.now()), httpOnly : true}).json({
            success : true,
            message : 'User ssfly Logout'
        });

    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }

}

exports.follower_ing = async (req, res) => {

    try {

        if(req.user._id.toString() === req.params.id.toString()){
            return res.status(500).json({
                success : false,
                message : "cant follow youself"
            });
        }


        const toFollow = await User.findById(req.params.id);
        const meUser = await User.findById(req.user._id);
        

        if(!toFollow){
            return res.status(404).json({
                success : false,
                message : "user not found"
            });
        }


        const isprevfollow = meUser.following.includes(req.params.id);

        if(isprevfollow){

            try{

                const idx1 = toFollow.followers.indexOf(meUser._id);
                const idx2 = meUser.following.indexOf(toFollow._id);

                toFollow.followers.splice(idx1, 1);
                meUser.following.splice(idx2, 1);

                await toFollow.save();
                await meUser.save();

                return res.status(200).json({
                    success : true,
                    message : "user unfollowed"
                })


            }
            catch(error){
                res.status(500).json({
                    success : false,
                    message : error.message
                })
            }

        }

        toFollow.followers.push(meUser._id); // req.user._id
        meUser.following.push(toFollow._id);  // req.params.id

        await toFollow.save();
        await meUser.save();

        res.status(201).json({
            success : true,
            message : "following done" 
        })
        

        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }

}

exports.updatePass = async (req ,res) => {
    try {
        
        const user = await User.findById(req.user._id).select('+password');
        const {oldpass , newpass} = req.body;

        if(!oldpass || !newpass){
            return res.status(400).json({
                success : false,
                message : "please provide both passwords"
            });  
        }

        const isMatch =  await user.matchPassword(oldpass);
        if(!isMatch){
            return res.status(400).json({
                success : false,
                message : "incorrect old password"
            });  
        }

        user.password = newpass;
        await user.save();

        res.status(200).json({
            success : true,
            message : "password changed"
        });


    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
} 


exports.updateProfile = async (req,res) => {

    try {

        
        const user = await User.findById(req.user._id);
        const {image , name , email} = req.body;
        
        if(name)
        user.name = name;
        if(email)
        user.email = email;
        if(image){
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder:"avatar",
            });
            try {
                await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            } catch (error) {
                console.log(error);
            }
            user.avatar.public_id = myCloud.public_id;
            user.avatar.url= myCloud.secure_url;

        }
        
        await user.save();

        res.status(200).json({
            success : true,
            message : "profile updated"
        })
        

        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.deleteAccount = async (req ,res) => {

    try {

        const user = await User.findById(req.user._id);
        const postArr = user.posts;
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        

        // delete my posts
        for (let i = 0; i < postArr.length; i++) {

            const post = await Post.findById(postArr[i]);
            await cloudinary.v2.uploader.destroy(post.image.public_id);


            await Post.findByIdAndDelete(postArr[i]);

            // ya

            // const post = Post.findById(postArr[i]);
            // await post.remove();

        }

        // ------delete me from other users profile----

        // other user ka follower ma se mujhe cut 
        const followingArr = user.following;
        for (let i = 0; i < followingArr.length; i++) {
            const other_user = await User.findById(followingArr[i]);
            const index = other_user.followers.indexOf(req.user._id);
            other_user.followers.splice(index ,1);
            await other_user.save();
        }
        
        // other user ka following ma se mujhe cut 
        const followerArr = user.followers;
        for (let i = 0; i < followerArr.length; i++) {
            const other_user = await User.findById(followerArr[i]);
            const index = other_user.following.indexOf(req.user._id); // user._id
            other_user.following.splice(index ,1);
            await other_user.save();
        }

        
        //delete user comments from other posts
        const allPosts = await Post.find();
        
        for (let i = 0; i < allPosts.length; i++) {
            const post = await Post.findById(allPosts[i]._id)
            for (let j = 0; j < post.comments.length; j++) {
                if(post.comments[j].user === req.user._id){
                    post.comments.splice(j,1);
                }
            }
            await post.save();
        }


        //delete user likes from other posts
        
        for (let i = 0; i < allPosts.length; i++) {
            const post = await Post.findById(allPosts[i]._id)
            for (let j = 0; j < post.likes.length; j++) {
                if(post.likes[j].user=== req.user._id){
                    post.likes.splice(j,1);
                }
            }
            await post.save();
        }

        // logout me
        // res.status(200).cookie('token' , null , {expires : new Date(Date.now()), httpOnly : true});
        
        await user.remove();
        res.status(200).json({
            success : true,
            message : "account Deleted "
        })
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }

}

exports.myProfile = async (req ,res) => {

    try {

        const user = await User.findById(req.user._id).populate('posts followers following');        
        
        return res.status(200).json({
            success : true,
            user,
        })
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }

}

exports.getAllUsers = async (req ,res) => {

    try {

        const user = await User.find({
            name : {$regex : req.query.name , $options : 'i'},
        });        
        

        res.status(200).json({
            success : true,
            user,
        })
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }

}

exports.getUserProfile = async (req ,res) => {

    try {

        const user = await User.findById(req.params.id).populate('posts followers following');      
        
        if(!user){
            return res.status(404).json({
                success : true,
                message : "user not found"
            })

        }
        
        res.status(200).json({
            success : true,
            user,
        })
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })

    }
    
}

exports.forgetPassword = async (req ,res) => {
    try {

        const {email} = req.body;

        const user= await User.findOne({email : email});
        
        if(!user){
            res.status(404).json({
                success : false,
                message : "user not found"
            })
        }

        const rp_token = user.getresetPasswordToken();
        await user.save();

        const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${rp_token}`;
        const message = `reset password by click on link \n \n ${resetUrl}`;

        try {

            // ------auth ma sending mail-------
            await send_Email({
                email : user.email,
                subject : "Reset Password",
                message,
            })

            return res.status(200).json({
                success : true,
                message : `email sent to ${user.email}`
            })
            
        } catch (error) {     // mail ni gyi lakin DB ma dono update hoge to esliya reset kro enha

            user.resetPasswordToken = undefined;
            user.expiryRPT =  undefined

            await user.save();
            

            res.status(500).json({
                success : false,
                message : "unable to send mail"
            })
            
        }
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
        
    }
}

exports.resetPassword = async (req ,res) => {
    try {

        // ----- hash because DB ma hased hi store kraya hua h------
        const rp_token = crypto.createHash('sha256').update(req.params.token).digest('hex');    // req.params.id token jo hum mail ma send kr rhe h
        
        const user = await User.findOne({
            resetPasswordToken : rp_token,
            expiryRPT : { $gt : Date.now() },

        });

        if(!user){
            return res.status(401).json({
                success : false,
                message : "token is invalid or expired"
            })
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.expiryRPT = undefined;

        await user.save();
        return res.status(200).json({
            success : true,
            message : "password changed :)"
        })

        


    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}


