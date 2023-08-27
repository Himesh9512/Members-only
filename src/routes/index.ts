import { NextFunction, Response } from "express";

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
	res.render("index", { title: "Express" });
});

router.get("/sign-up", function (req: Request, res: Response, next: NextFunction) {
	res.render("sign-up");
});

router.post("/sign-up", function (req: Request, res: Response, next: NextFunction) {
	res.send("NOT IMPLEMENTED: Post Sign-up");
});

router.get("/login", function (req: Request, res: Response, next: NextFunction) {
	res.send("NOT IMPLEMENTED: Get Login");
});

router.post("/login", function (req: Request, res: Response, next: NextFunction) {
	res.send("NOT IMPLEMENTED: Post Login");
});

module.exports = router;
