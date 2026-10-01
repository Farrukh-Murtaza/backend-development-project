const router = require('express').Router();
const authRoutes = require("./auth-routes");
const projectRoutes = require("./project-routes");
const taskRoutes = require("./task-routes");

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;