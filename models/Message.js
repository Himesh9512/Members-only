const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
	title: { type: String, required: true },
	content: String,
	date: { type: Date, default: new Date() },
});

MessageSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Message", MessageSchema);
