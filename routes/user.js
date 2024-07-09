const userController = require("../controller/userController");

const router = require("express").Router();

// ADD USER
router.post("/", userController.addUser)

// UPDATE USER
router.put("/:id", userController.updateUser);


module.exports = router