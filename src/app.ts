import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { Mongoose } from "mongoose";
import * as dotenv from "dotenv";

const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

dotenv.config();

const app = express();

// mongodb connection
const mongoose: Mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function main() {
	const mongodb = process.env.CONNECTION_KEY;
	mongoose.connect(mongodb as string);
}

main().catch((e) => console.log(e));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
	next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
