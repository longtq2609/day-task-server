const Task = require('../model/task')
const mongoose = require('mongoose');

const taskController = {
    create: async(req, res) => {
        try {
            const { title, description, due_date, created_by, assignee_id } = req.body;

            if (!assignee_id || !Array.isArray(assignee_id)) {
                return res.status(400).json({ error: 'Invalid assigneeId. Must be an array of ObjectIds.' });
              }

            const newTask = new Task({
                title,
                description,
                due_date,
                created_by: new mongoose.Types.ObjectId(created_by),
                assignee_id: assignee_id.map(id => new mongoose.Types.ObjectId(id))
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
    }
};

module.exports = taskController