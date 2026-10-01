const router = require("express").Router();
const taskController = require("../controllers/task-controller");
const verifyAuthentication = require("../middlewares/verifyAuthentication");

router.use(verifyAuthentication);

router.put("/:id" , taskController.updateResource);
router.delete("/:id" , taskController.deleteResource);


module.exports = router;
