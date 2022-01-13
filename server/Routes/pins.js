const router = require("express").Router();
const Pin = require('../Models/Pin');


// Create a Pin

router.post("/", async (req, res) => {
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save();
    }catch(err) {
        console.log(err);
    }
});

// Get all Pins

router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find();
    }catch(err) {
        console.log(err);
    }
});

module.exports = router;
