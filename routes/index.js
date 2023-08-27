const express = require("express");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.get("/sign-up", function (req, res, next) {
	res.render("sign-up");
});

router.post(
	"/sign-up",
	body("firstname", "First name should not be empty").trim().isLength({ min: 1 }).escape(),
	body("lastname").optional().trim().isLength({ min: 1 }).escape(),
	body("email").custom(async (value) => {
		const user = await User.find({ email: value });

		if (user) {
			throw new Error("E-mail already exists");
		}
	}),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("Password should not be empty")
		.isLength({ min: 8 })
		.withMessage("Password must contain atleast 8 characters")
		.escape(),
	body("confirm-password", "Password does not match").custom(async (value, { req }) => {
		return value === req.body.password;
	}),
	asyncHandler(async function (req, res, next) {
		const results = validationResult(req);

		const user = await User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.email,
			isMember: false,
			isAdmin: false,
		});

		if (!results.isEmpty()) {
			res.render("sign-up", { errors: results.array() });
		} else {
			await user.save();
		}
	}),
);

router.get("/login", function (req, res, next) {
	res.send("NOT IMPLEMENTED: Get Login");
});

router.post("/login", function (req, res, next) {
	res.send("NOT IMPLEMENTED: Post Login");
});

module.exports = router;
