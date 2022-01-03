require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./Routes/users");
const pinRoute = require("./Routes/pins");

const app = express();

app.use(express.json());

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to the Database");
})
.catch((err) => {
    console.log("Error Connecting to DB:",err);
});

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

let port = process.env.PORT || 3300;

app.listen(port, ()=>{
    console.log("Server Started on Port:",port);
});
