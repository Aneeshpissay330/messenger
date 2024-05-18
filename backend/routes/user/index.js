const express = require("express");
const { postUser } = require("../../controllers/user");

const userRouter = express.Router();

userRouter.route("/").post(postUser);

module.exports = userRouter;