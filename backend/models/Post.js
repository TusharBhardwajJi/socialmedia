const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    caption : String,
    image: {
        public_id : String,
        url : String
    },

    owner : {      // jo bhi user hoga oose mongo hi dekhlega (ref) User wale scheme se
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },

    createdAd : {
        type : Date,
        default : Date.now,
    },

    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
        }
    ],

    comments : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
            },
            usercomment : {
                type : String,
                required : true,  // agar vo comment kr rha ha to khale ni kr skta

            }
        },
    ],




});

module.exports = mongoose.model("Post" , postSchema );