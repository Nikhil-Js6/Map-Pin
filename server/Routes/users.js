
const router = require("express").Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Register

router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword,
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }catch(err) {
        res.status(500).json(err);
    }
});

// Login

router.post("/login", async (req, res) => {
    const foundUser = await User.findOne({
        username: req.body.username,
    });
});

module.exports = router;
