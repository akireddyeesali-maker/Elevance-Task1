const express = require("express");
const router = express.Router();

const admin = require("./admin");
const intern = require("./internship");
const job = require("./job");
const application = require("./application");
const post = require("./post");
const forgotPassword = require("./forgotPassword");

router.use("/admin", admin);
router.use("/internship", intern);
router.use("/job", job);
router.use("/application", application);
router.use("/posts", post);
router.use("/auth", forgotPassword);

module.exports = router;