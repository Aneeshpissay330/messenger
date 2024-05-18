const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { runDB } = require('./helpers/mongodb');

runDB().then(() => console.log("Mongodb successfully connected")).catch((error) => console.log(error));

const firebaseRouter = require('./routes/firebase');
const geminiRouter = require('./routes/gemini');
const userRouter = require('./routes/user');
const app = express();

app.use(cors());
app.use(express.json());

app.use("/firebase", firebaseRouter);
app.use("/gemini", geminiRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening in PORT ${PORT}`);
});