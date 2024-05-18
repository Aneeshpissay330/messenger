const express = require("express");
const { sendMessage } = require("../../controllers/firebase");

const firebaseRouter = express.Router();

firebaseRouter.route("/messaging").post(sendMessage);

module.exports = firebaseRouter;