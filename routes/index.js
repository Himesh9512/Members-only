const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.get("/sign-up", function (req, res, next) {
	res.render("sign-up");
});

router.post("/sign-up", user_controller.user_sign_up);

router.get("/login", function (req, res, next) {
	res.send("NOT IMPLEMENTED: Get Login");
});

router.post("/login", function (req, res, next) {
	res.send("NOT IMPLEMENTED: Post Login");
});

module.exports = router;
