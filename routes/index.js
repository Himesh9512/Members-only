const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express", user: req.user });
});

router.get("/sign-up", function (req, res, next) {
	res.render("sign-up");
});

router.post("/sign-up", user_controller.user_sign_up);

router.get("/login", function (req, res, next) {
	res.render("login");
});

router.post("/login", user_controller.user_login);

router.get("/logout", user_controller.user_logout);

module.exports = router;
