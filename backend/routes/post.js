const express = require('express');
const {createPost, likeNunlikePost, deletePost , others_post, updateCaption, commentOnPost, deleteComment, showMyPosts, user_post} = require('../controllers/post');
const {islogedIn} = require('../middleman/auth')

const router = express.Router();
router.route('/post/upload').post( islogedIn , createPost);

router.route('/post/:id').get( islogedIn , likeNunlikePost).delete(islogedIn , deletePost);

router.route('/post').get(islogedIn , others_post);


router.route('/post/:id').put(islogedIn , updateCaption);
router.route('/my/posts').get(islogedIn , showMyPosts);
router.route('/userposts/:id').get(islogedIn , user_post);


//     ------- id post ki h ------ wanted post pr comment update add delete -------
router.route('/post/comment/:id').put(islogedIn , commentOnPost).delete(islogedIn , deleteComment);

module.exports = router;    