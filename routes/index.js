const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

/* GET home page. */
router.get("/", user_controller.index);

router.get("/sign-up", user_controller.user_sign_up_get);

router.post("/sign-up", user_controller.user_sign_up_post);

router.get("/login", user_controller.user_login_get);

router.post("/login", user_controller.user_login_post);

router.get("/logout", user_controller.user_logout);

router.get("/join-club", user_controller.user_join_club_get);

router.post("/join-club", user_controller.user_join_club_post);

router.post("/message-create", message_controller.create_message);

router.post("/message-delete/:id", message_controller.delete_message);

module.exports = router;
