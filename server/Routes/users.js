
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
    if (foundUser) {
        try {
           const isCorrect = await bcrypt.compareSync(req.body.password, foundUser.password);
           isCorrect 
              ? res.status(200).json(foundUser)
              : res.status(403).json("Wrong Password!");
        }catch(err) {
            res.status(500).json(err);
        }
    }else {
        res.status(404).json("No User Found!");
    }
});

module.exports = router;
