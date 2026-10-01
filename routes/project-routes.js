const router = require("express").Router();
const projectController = require("../controllers/project-controller");
const verifyAuthentication = require("../middlewares/verifyAuthentication");


router.use(verifyAuthentication);
router.get("/" , projectController.getProjects);
router.get("/:id" , projectController.findById);
router.post("/" , projectController.createProjects);
router.put("/:id" , projectController.updateProject);
router.delete("/:id" , projectController.deleteProject);



module.exports = router;
