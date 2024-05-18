const express = require("express");
const { generateTextToText } = require("../../controllers/gemini");

const geminiRouter = express.Router();

geminiRouter.route("/generate/text").post(generateTextToText);

module.exports = geminiRouter;