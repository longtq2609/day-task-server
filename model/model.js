const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id : {
        type : Number,
    },
    user_name : {
        type : String,
        require: true
    },
    email : {
        type : String,
        require: true
    },
    password : {
        type : String,
        require: true
    },
    display_name : {
        type : String,
        default: ''
    },
    avatar : {
        type : String,
       default: ''
    },
    // role : {
    //     type : String,
    //     default: ''
    // },
    create_at : {
        type : Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
})

let User = mongoose.model("User", userSchema);

module.exports = { User }; 