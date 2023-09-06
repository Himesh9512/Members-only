const Message = require("../models/Message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.create_message = [
	body("title")
		.trim()
		.notEmpty()
		.withMessage("Title should not be empty")
		.isLength({ min: 1, max: 50 })
		.withMessage("Title length should be between 1 to 20 characters")
		.escape(),
	body("content").trim().escape(),
	asyncHandler(async function (req, res, next) {
		const results = validationResult(req);

		if (!req.user) {
			res.redirect("/login");
		}

		const message = await Message({
			user: req.user._id,
			title: req.body.title,
			content: req.body.content,
			date: new Date(),
		});

		if (!results.isEmpty()) {
			const messages = await Message.find({});
			res.render("index", { user: req.user, messages: messages, errors: results.array() });
		} else {
			await message.save();
			res.redirect("/");
		}
	}),
];

exports.delete_message = asyncHandler(async function (req, res, next) {
	const message = req.params.id;

	if (req.user && req.user.isAdmin) {
		await Message.findByIdAndRemove(message);
		res.redirect("/");
	} else {
		res.redirect("/");
	}
});
