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

router.get("/join-club", function (req, res, next) {
	res.send("NOT IMPLEMENTED: Get Join club");
});

router.post("/join-club", function (req, res, next) {
	res.send("NOT IMPLEMENTED: Post Join club");
});

router.get("/write", function (req, res, next) {
	res.send("NOT IMPLEMENTED: Get Write message");
});

router.post("/write", function (req, res, next) {
	res.send("NOT IMPLEMENTED: Post Write message");
});

router.get("/delete", function (req, res, next) {
	res.send("NOT IMPLEMENTED: Get Delete message");
});

router.post("/delete", function (req, res, next) {
	res.send("NOT IMPLEMENTED: Post Delete message");
});

module.exports = router;
