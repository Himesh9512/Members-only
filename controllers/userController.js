const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Message = require("../models/Message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");

exports.index = asyncHandler(async function (req, res, next) {
	const messages = await Message.find({}).populate("user");
	res.render("index", { user: req.user, messages: messages });
});

exports.user_sign_up_get = function (req, res, next) {
	res.render("sign-up");
};

exports.user_sign_up_post = [
	body("name", "Name should not be empty").trim().isLength({ min: 1 }).escape(),
	body("email")
		.trim()
		.isEmail()
		.withMessage("Invalid Email")
		.custom(async (value) => {
			const user = await User.findOne({ email: value });

			if (user) {
				throw new Error("E-mail already exists");
			}
		})
		.escape(),
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
		})
		.escape(),
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
			res.redirect("/login");
		}
	}),
];

exports.user_login_get = function (req, res, next) {
	if (req.user) {
		res.redirect("/");
	}
	res.render("login");
};

exports.user_login_post = passport.authenticate("local", {
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

exports.user_join_club_get = function (req, res, next) {
	if (!req.user) {
		res.redirect("/login");
	}
	res.render("join-club", { user: req.user });
};

exports.user_join_club_post = [
	body("secret-code")
		.trim()
		.notEmpty()
		.withMessage("Field is Empty")
		.custom(function (value) {
			const secretCode = process.env.SECRET_CODE;

			return secretCode === value;
		})
		.withMessage("Secret Code is INVALID!")
		.escape(),
	asyncHandler(async function (req, res, next) {
		const results = validationResult(req);

		if (!req.user) {
			res.redirect("/login");
		}
		if (!results.isEmpty()) {
			res.render("join-club", { user: req.user, errors: results.array() });
		} else {
			await User.updateOne({ email: req.user.email }, { isMember: true });
			res.redirect("/");
		}
	}),
];

exports.user_admin_get = function (req, res, next) {
	if (!req.user) {
		res.redirect("/login");
	}
	res.render("admin", { user: req.user });
};

exports.user_admin_post = [
	body("secret-code")
		.trim()
		.notEmpty()
		.withMessage("Field is Empty")
		.custom(function (value) {
			const secretCode = process.env.ADMIN_CODE;

			return secretCode === value;
		})
		.withMessage("Secret Code is INVALID!")
		.escape(),
	asyncHandler(async function (req, res, next) {
		const results = validationResult(req);

		if (!req.user) {
			res.redirect("/login");
		}
		if (!results.isEmpty()) {
			res.render("admin", { user: req.user, errors: results.array() });
		} else {
			await User.updateOne({ email: req.user.email }, { isAdmin: true });
			res.redirect("/");
		}
	}),
];
