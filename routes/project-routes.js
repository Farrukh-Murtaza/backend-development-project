const router = require("express").Router();


router.get("/" , (req, res) => {
    res.json({
        message: "project working"
    });
})


module.exports = router;
