const userController = require("../controller/userController");

const router = require("express").Router();


// ADD USER
router.post("/register", userController.registerUser)

// LOGIN
router.post('/login', userController.login);

// UPDATE USER
router.put("/:id", userController.updateUser);

// GET ALL USER
router.get("/get-all-user", userController.getAllUser);


module.exports = router