const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
require('dotenv').config();

//<-------------------- Creating App ------------------------>//
const app = express();

//<-------------------- Accessing cross origin ------------------------>//
app.use(cors());

//<-------------------- Body parser ------------------------>//
app.use(express.json());

//<-------------------- Default route ------------------------>//
app.get("/", (req, res) => {
    res.send("Welcome to Razorpay backed");
})


var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
});

//<-------------------- POST route ------------------------>//
app.post("/create-order", async (req, res) => {
    var options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: "receipt_1",
    };

    try {
        const order = await instance.orders.create(options);
        console.log(order);
        res.status(200).send(order);
    } catch (error) {
        console.log(error);
    }
});


//<-------------------- Server ------------------------>//
app.listen(process.env.PORT, () => {
    console.log(`server is running at PORT: ${process.env.PORT}`);
})


