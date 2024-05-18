const { messaging } = require('../../helpers/firebase');
const User = require('../../models/User');

const postUser = async (req, res) => {
    try {
        const { displayName, phoneUid, phoneNumber, emailUid, email, photo, token } = req.body;
        const existingUser = await User.findOne({ $and: [{ email, phoneNumber }] });
        if (existingUser) {
            const previousToken = existingUser.token;
            if (previousToken && previousToken !== token) {
                try {
                    const data = {
                        type: "logout"
                    };
                    var payload = {
                        data: data,
                        token: previousToken
                    };
                    await messaging.send(payload);
                } catch (error) {
                    console.log(error);
                }
            }
            existingUser.token = token;
            await existingUser.save();
            return res.status(200).json(existingUser);
        }
        const newUser = new User({
            displayName,
            phoneUid,
            phoneNumber,
            emailUid,
            email,
            photo,
            token
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

module.exports = {
    postUser
}