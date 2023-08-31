const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");

exports.user_sign_up = [
	body("name", "Name should not be empty").trim().isLength({ min: 1 }).escape(),
	body("email")
		.trim()
		.isEmail()
		.withMessage("Invalid Email")
		.custom(async (value) => {
			const user = await User.findOne({ email: value });

			console.log(user);
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
	body("confirm-password")
		.trim()
		.isLength({ min: 8 })
		.withMessage("Confirm-Password must contain atleast 8 characters")
		.custom(async (value, { req }) => {
			const password = req.body.password;

			if (value !== password) {
				throw new Error("Password did not match");
			}
		}),
	asyncHandler(async function (req, res, next) {
		bcrypt.hash(req.body.password, 10, async (err, hashPassword) => {
			if (err) {
				next(err);
			} else {
				req.body.password = hashPassword;
				next();
			}
		});
	}),
	asyncHandler(async function (req, res, next) {
		const results = validationResult(req);

		const user = await User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			isMember: false,
			isAdmin: false,
		});

		if (!results.isEmpty()) {
			res.render("sign-up", { errors: results.array() });
		} else {
			await user.save();
			console.log(await User.find({}));
			res.redirect("/login");
		}
	}),
];

exports.user_login = passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login",
});

exports.user_logout = (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		} else {
			res.redirect("/");
		}
	});
};
