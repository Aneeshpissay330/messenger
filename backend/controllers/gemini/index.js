const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateTextToText = async (req, res) => {
    try {
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            }
        ];
        const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });
        const prompt = req.body.text;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ text });
    } catch (error) {
        const safetyRatings = error.response.candidates[0].safetyRatings;
        const notNegligibleCategories = safetyRatings
            .filter(item => item.probability !== 'NEGLIGIBLE')
            .map(item => item.category);

        res.json({ error: notNegligibleCategories });
    }
}

module.exports = {
    generateTextToText
}