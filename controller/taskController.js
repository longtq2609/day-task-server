const Task = require('../model/task')
const mongoose = require('mongoose');

const taskController = {
    create: async(req, res) => {
        try {
            const { title, description, due_date, created_by, assignee_id , parent_id} = req.body;

            if (!assignee_id || !Array.isArray(assignee_id)) {
                return res.status(400).json({ error: 'Invalid assigneeId. Must be an array of ObjectIds.' });
              }

            const newTask = new Task({
                title,
                description,
                due_date,
                created_by: new mongoose.Types.ObjectId(created_by),
                assignee_id: assignee_id.map(id => new mongoose.Types.ObjectId(id)),
                parent_id: parent_id ? new mongoose.Types.ObjectId(parent_id) : null // Xử lý parentId
              });
            const savedTask = await newTask.save();
            res.status(200).json(savedTask);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getTasksByUser: async (req, res) => {
        try {
            const userId = req.params.userId;
        
            if (!mongoose.Types.ObjectId.isValid(userId)) {
              return res.status(400).json({ error: 'Invalid userId' });
            }
        
            const tasks = await Task.find({
              $or: [
                { created_by: userId },
                { assignee_id: userId }
              ]
            }).populate('created_by assignee_id'); 
        
            res.status(200).json(tasks);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    },

    getTaskDetail : async (req, res) => {
        try {
            const taskId = req.params.taskId;

            if (!mongoose.Types.ObjectId.isValid(taskId)) {
              return res.status(400).json({ error: 'Invalid taskId' });
            }
        
            const task = await Task.findById(taskId)
              .populate('created_by', 'username') 
              .populate('assignee_id', 'username'); 

            if (!task) {
              return res.status(404).json({ error: 'Task not found' });
            }
        
            const subtasks = await Task.find({ parentId: taskId })
              .populate('created_by assignee_id'); 
        
            res.status(200).json({ task, subtasks });
        } catch (error) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = taskController