const taskController = require("../controller/taskController")

const router = require("express").Router();

// CREATE TASK 
router.post("/create", taskController.create)

// GET LIST TASK BY USER
router.get("/user/:userId", taskController.getTasksByUser)

module.exports = router