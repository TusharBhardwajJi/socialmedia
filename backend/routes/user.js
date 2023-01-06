const express = require('express');
const {register, follower_ing, logout, updatePass, updateProfile, deleteAccount, myProfile, getUserProfile, getAllUsers, forgetPassword, resetPassword} = require('../controllers/user')
const {login} = require('../controllers/user')
const {islogedIn} = require('../middleman/auth');
const router = express.Router();


// register --- login --- logout
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get( islogedIn, logout);


// ----- follow-----
router.route('/follow/:id').get(islogedIn , follower_ing);

// ----- name email password ---- update ----
router.route('/update/password').put(islogedIn , updatePass);
router.route('/update/profile').put(islogedIn , updateProfile);

// ------ delete_account------
router.route('/delete/me').delete(islogedIn , deleteAccount);

// ------ my profile data-----
router.route('/me').get(islogedIn , myProfile);

//------ Users ----
router.route('/user/:id').get(islogedIn , getUserProfile);
router.route('/users').get(islogedIn , getAllUsers);

// ----- forget password-----
router.route('/forgot/password').post(forgetPassword);
// ----- forget password-----
router.route('/password/reset/:token').put(resetPassword);


    

module.exports = router;
