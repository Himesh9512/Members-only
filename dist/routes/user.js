"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
/* GET home page. */
router.get("*", function (req, res, next) {
    res.redirect("/");
});
router.get("/:id/join-club", function (req, res, next) {
    res.send("NOT IMPLEMENTED: Get Join club");
});
router.post("/:id/join-club", function (req, res, next) {
    res.send("NOT IMPLEMENTED: Post Join club");
});
router.get("/:id/write", function (req, res, next) {
    res.send("NOT IMPLEMENTED: Get Write message");
});
router.post("/:id/write", function (req, res, next) {
    res.send("NOT IMPLEMENTED: Post Write message");
});
router.get("/:id/delete", function (req, res, next) {
    res.send("NOT IMPLEMENTED: Get Delete message");
});
router.post("/:id/delete", function (req, res, next) {
    res.send("NOT IMPLEMENTED: Post Delete message");
});
module.exports = router;
