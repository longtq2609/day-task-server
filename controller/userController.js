const { User } = require("../model/model");

const userController = {
    addUser : async (req, res) => {
       try{
            const newUser = new User(req.body);
            const saveUser = await newUser.save();
            res.status(200).json(saveUser);

       }catch(err){
           res.status(500).json(err);
       }
    },

    updateUser : async(req, res) => {
        try {
            const user = await User.findById(req.params.id);
            await user.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (error) {
            res.status(500).json(err);
        }
    }
};

module.exports = userController