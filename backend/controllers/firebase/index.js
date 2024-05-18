const { messaging } = require("../../helpers/firebase");

const sendMessage = async (req, res) => {
    try {
        const data = req.body.data;
        const token = req.body.token;
        var payload = {
            data: data,
            token: token
        };
        const response = await messaging.send(payload);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendMessage
}