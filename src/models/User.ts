import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		first: { type: String, required: true },
		last: { type: String, required: true },
		required: true,
	},
	email: { type: String, required: true },
	password: { type: String, required: true },
	isMember: { type: Boolean, default: false },
	isAdmin: Boolean,
});

UserSchema.virtual("fullname").get(function () {
	return this.name.first + " " + this.name.last;
});

module.exports = mongoose.model("User", UserSchema);
