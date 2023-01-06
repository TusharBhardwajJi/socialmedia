const Post = require('../models/Post');
const User = require('../models/User');
const cloudinary = require('cloudinary');

////////////// req.user._id :::: loged in user ///////

exports.createPost = async ( req , res) => {
    try{

        // image ka url jo hmne form ma se pass kiya
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder:"posts",
        });


        const newPostData= {
            caption : req.body.caption,
            image : {
                public_id : myCloud.public_id,
                url : myCloud.secure_url,
            },
            owner : req.user._id,    // cookie.token->auth.decode->routes_folder->islogedIn(handler)  se  mila req.user._id

        };

        const newPost = await Post.create(newPostData);

        // user wale model ma Post model ka data bhi to bhejna h
        const user = await User.findById(req.user._id);     // ---  user dhundlia 

        user.posts.unshift(newPost._id);  // jis user na post dale h oski posts array ma newPost ki id bhejde
        await user.save();          // post dalke save krdo


        
        res.status(201).json({
            success : true,
            // post : newPost,
            message : "post created",
        }) 

    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
};


exports.deletePost = async (req ,res) => {
    try {

        const post = await Post.findById(req.params.id);
        
        
        if(!post){
            return res.status(404).json({
                success : false,
                message : "post not found"
            });
        }
        
        
        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(404).json({
                success : false,
                message : "apni post delete karo"
            });
        }

        await cloudinary.v2.uploader.destroy(post.image.public_id);
        
        await post.remove();

        const user = await User.findById(req.user._id);
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index ,1);
        await user.save();
        
        return res.status(200).json({
            success : true,
            message : "post removed"
        });


        
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
}

exports.likeNunlikePost = async (req , res) =>{
    try {
        const post = await Post.findById(req.params.id);


        if(!post){

            return res.status(404).json({
                success : false,
                message : "post not found"
            })

        }

        if(post.likes.includes(req.user._id)){
            const index = post.likes.indexOf(req.user._id);
    
            post.likes.splice(index ,1);
            
            await post.save();

            return res.status(200).json({
                success : true,
                message : "post disliked"
            });
        }
        else{
            post.likes.push(req.user._id);
            await post.save();
            return res.status(200).json({
                success : true,
                message : "post liked"
            })

        }

    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
}


exports.others_post = async (req , res)=>{      // other vo jesa hum follow kr rhe h
    try {

        const meUser = await User.findById(req.user._id);        // .populate('following' , "posts");
        const youpost = await Post.find({
            owner : {$in : meUser.following}                       // oon sab ki post jena mnna follow kr rakha 
        }).populate("owner likes comments.user") // en teeno ma hmne id di hui h user ka colec ki

        res.status(200).json({
            success : true,
            post : youpost.reverse(),
        })

        // const postArr = otheruser.posts
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
}



exports.showMyPosts = async (req , res)=>{      // other vo jesa hum follow kr rhe h
    try {
        
        const user = await User.findById(req.user._id);
        const posts=[];

        // har post ko populate krne ka liya
        for(let i=0; i<user.posts.length ; i++){
            const temp = await Post.findById(user.posts[i]).populate("likes comments.user owner");
            posts.push(temp);
        }

        
        res.status(200).json({
            success : true,
            posts
        })

        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
}


exports.user_post = async (req , res)=>{      // other vo jesa hum follow kr rhe h
    try {
        
        const user = await User.findById(req.params.id);
        const posts=[];

        // har post ko populate krne ka liya
        for(let i=0; i<user.posts.length ; i++){
            const temp = await Post.findById(user.posts[i]).populate("likes comments.user owner");
            posts.push(temp);
        }

        
        res.status(200).json({
            success : true,
            posts
        })

        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
}





exports.updateCaption = async (req , res)=>{      // other vo jesa hum follow kr rhe h
    try {

        const post = await Post.findById(req.params.id);
        
        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(500).json({
                success : false,
                message : "apni post pr dhyan do"
            })
            
        }

        const {newCaption} = req.body;

        post.caption = newCaption;

        await post.save();

        res.status(200).json({
            success : true,
            message : "cation updated"
        })

        // const postArr = otheruser.posts
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
}

exports.commentOnPost = async (req ,res) => {
    try {
        
        const post = await Post.findById(req.params.id);

        if(!post){
            res.status(400).json({
                success : false,
                message: "post not found",
            })
        }

        const {comment} = req.body; 
        var isfind =false;

        for (let i = 0; i < post.comments.length; i++) {

            var commentwala = post.comments[i].user;

            if(commentwala.toString() === req.user._id.toString() ){
                post.comments[i].usercomment = comment;
                isfind=true;
                await post.save();
            }
            
        }

        if(isfind){
            return res.status(200).json({
                success : true,
                message : "comment updated"
            });
        }
        else{
            post.comments.push({user : req.user._id , usercomment :comment});
            await post.save();
            res.status(201).json({
                success : true,
                message : "comment added"
            });
        }


        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
}



exports.deleteComment = async (req ,res) => {
    try {
        
        const post = await Post.findById(req.params.id);

        // if i give my post id ----> than give comment id in req.body

        if(!post){
            return res.status(400).json({
                success : false,
                message: "post not found",
            })
        }

        // ---- meri post -----
        if(post.owner.toString() === req.user._id.toString()){

            if(req.body.commentId === undefined){
                return res.status(400).json({
                    success : false,
                    message : "comment Id required"
                })
            }
            
            post.comments.forEach((item , index) => {
                if(item._id.toString() === req.body.commentId.toString()){
                    return post.comments.splice(index , 1);
                }
            })
            
            await post.save();
            return res.status(200).json({
                success : true,
                message : "selected comment deleted"
            })

            
        }
        else{         /// ----- my comment on others post----
            post.comments.forEach((item , index) => {
                if(item.user.toString() === req.user._id.toString()){
                    return post.comments.splice(index , 1);
                }
            })
            
            await post.save();
            return res.status(200).json({
                success : true,
                message : "your comment deleted"
            })
            
            
        }


        


        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
}