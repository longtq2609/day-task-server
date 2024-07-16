const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    user_name: {  
        type: String,
        required: true,
        unique: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: true,
    },
    display_name: { 
        type: String,
        default: '',
    },
    avatar: {  
        type: String,
        default: 'https://i.ibb.co/d2BgxJv/Rectangle-6.png', 
    },
    role: { 
        type: String,
        enum: ['user', 'admin'], 
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: { 
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User; 
