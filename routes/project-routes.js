const router = require("express").Router();
const projectController = require("../controllers/project-controller");
const verifyAuthentication = require("../middlewares/verifyAuthentication");


router.use(verifyAuthentication);
router.get("/" , projectController.getAll);
router.get("/:id" , projectController.findById);
router.post("/" , projectController.createResource);
router.put("/:id" , projectController.updateResource);
router.delete("/:id" , projectController.deleteResource);



module.exports = router;
