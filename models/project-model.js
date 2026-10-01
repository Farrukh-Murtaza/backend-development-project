const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Project = new mongoose.model("Project", projectSchema);

module.exports = Project;