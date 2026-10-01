const mongoose = require("mongoose");

const Task = require("../models/task-model");
const Project = require("../models/project-model");

async function createResource(req, res) {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID."
            });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found."
            });
        }

        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to create a task for this project."
            });
        }

        const newTask = await Task.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            project: projectId
        });

        res.status(201).json({
            message: "Task created successfully.",
            task: newTask
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message
        });
    }
}

async function getTaskByProject(req, res) {
    try {
        const { projectId } = req.params;

        
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID."
            });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found."
            });
        }

       
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to view tasks for this project."
            });
        }

       
        const tasks = await Task.find({
            project: projectId
        });

        res.status(200).json({
            tasks
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message
        });
    }
}

async function updateResource(req, res) {
    try {
        const { taskId } = req.params;

       
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                message: "Invalid task ID."
            });
        }

       
        const task = await Task.findById(taskId);

       
        if (!task) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        
        const project = await Project.findById(task.project);

       
        if (!project) {
            return res.status(404).json({
                message: "Parent project not found."
            });
        }

       
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this task."
            });
        }

      
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Task updated successfully.",
            task: updatedTask
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message
        });
    }
}

async function deleteResource(req, res) {
    try {
        const { taskId } = req.params;

        
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                message: "Invalid task ID."
            });
        }

       
        const task = await Task.findById(taskId);
        
        if (!task) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        const project = await Project.findById(task.project);

        if (!project) {
            return res.status(404).json({
                message: "Parent project not found."
            });
        }

        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this task."
            });
        }

        await Task.findByIdAndDelete(taskId);

        res.status(200).json({
            message: "Task deleted successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    createResource,
    getTaskByProject,
    updateResource,
    deleteResource
};