const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Sai email' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Sai mật khẩu' });
            }

            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET environment variable is not set');
            }
            
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ 
                token,
                user: {
                    _id: user._id,
                    user_name: user.user_name,
                    email: user.email,
                }
            });
        } catch (error) {
            console.error('Error in authController.login:', error); // Better error logging
            if (error.message === 'JWT_SECRET environment variable is not set') {
                res.status(500).json({ message: 'Internal server error: JWT secret missing' });
            } else {
                res.status(500).json({ message: 'Lỗi server' });
            }
        }
    },

    registerUser : async (req, res) => {
        try {
            const { user_name, email, password } = req.body;
    
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email đã được sử dụng' });
            }
    
            const existingUserName = await User.findOne({ user_name });
            if (existingUserName) {
                return res.status(400).json({ message: 'Tên đăng nhập đã được sử dụng' });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10); 
            const newUser = new User({
                user_name,
                email,
                password: hashedPassword,
            });
    
            await newUser.save();
    
            res.status(201).json({ message: 'Đăng ký thành công', user: newUser }); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server' });
        }
    },

    updateUser : async(req, res) => {
        try {
            const user = await User.findById(req.params.id);
            await user.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllUser : async(req, res) => {
        try {
            const user = await User.find({});
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
};

module.exports = userController