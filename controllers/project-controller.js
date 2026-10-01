const mongoose = require("mongoose");
const Project = require("../models/project-model");


async function getProjects(req, res) {
    try {
        const projects = await Project.find({
            user: req.user._id
        }).populate("user", "-password");

        res.status(200).json({
            projects
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
}

// CREATE NOTE
async function createProjects(req, res) {

    
    try {
        const newProject = await Project.create({
            name: req.body.name,
            description: req.body.content,
            user: req.user._id
        });

        res.status(201).json({
            message: "Project created successfully.",
            project: newProject
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message
        });
    }
}

async function findById(req, res){


    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({
                    message: "Invalid project ID."
            });
        }

        const project = await Project.findOne({ 
            _id: req.params.id, 
            user: req.user._id
            });

    
        if (!project) {
            return res.status(404).json({
                message: "Project not found."
            });
        }

         res.status(200).json(project);
        
    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message
        });
    }
}

async function updateProject (req, res){
   try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "Invalid project ID."
        });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
        return res.status(404).json({
            message: "Project not found."
        });
    }

    if (project.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "You are not authorized to update this project."
        });
    }

    const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        message: "Project updated successfully.",
        project: updatedProject
    });

   } catch (error) {
     console.error(error);

    res.status(400).json({
        message: error.message
    });
    
   }
}



async function deleteProject (req, res){
   try {
     const project = await Project.findById(req.params.id);

    if (!project) {
        return res.status(404).json({
            message: "Project not found."
        });
    }

    if (project.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "You are not authorized to delete this project."
        });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "Project deleted successfully."
    });

   } catch (error) {

     console.error(error);
        res.status(400).json({
            message: error.message
        });
    
   }
}


module.exports = {
    getProjects,
    findById,
    createProjects,
    updateProject,
    deleteProject
}