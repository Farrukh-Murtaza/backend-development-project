const router = require("express").Router();
const userRoutes = require("../controllers/user-controller");
const verifyAuthentication = require("../middlewares/verifyAuthentication");


router.post("/register" ,userRoutes.registerUser);
router.post("/login" ,userRoutes.loginUser);
router.get("/me" , verifyAuthentication ,userRoutes.getUser);


module.exports = router;
