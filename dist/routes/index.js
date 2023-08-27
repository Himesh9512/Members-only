"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});
router.get("/sign-up", function (req, res, next) {
    res.send("NOT INMPLEMENTED: Get Sign-up");
});
router.post("/sign-up", function (req, res, next) {
    res.send("NOT IMPLEMENTED: Post Sign-up");
});
router.get("/login", function (req, res, next) {
    res.send("NOT IMPLEMENTED: Get Login");
});
router.post("/login", function (req, res, next) {
    res.send("NOT IMPLEMENTED: Post Login");
});
module.exports = router;
