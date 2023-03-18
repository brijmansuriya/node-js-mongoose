var express = require("express");
var router = express.Router();
console.log('routes auth.js');
const admins = require("../controllers/auth.controller.js");
console.log('routes auth.js');
// var VerifyToken = require("../config/VerifyToken");
/* GET admins listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post("/login", admins.login);


module.exports = router;
