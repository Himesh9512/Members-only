import { Mongoose } from "mongoose";

const mongoose: Mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
	title: { type: String, required: true },
	content: String,
	date: Date,
});

module.exports = mongoose.model("Message", MessageSchema);
