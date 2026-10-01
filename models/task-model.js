const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  }
}, {
  timestamps: true
});

const Task = new mongoose.model("Task", taskSchema);

module.exports = Task;