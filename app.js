require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoute = require("./routes/auth");
const restaurantRoute = require("./routes/restaurant");
const customerRoute = require("./routes/user_customer");
const valetRoute = require("./routes/user_valet");

//DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED...");
})
    .catch(() => {
        console.log("In catch SECTION");
    });

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoute);
app.use("/api", restaurantRoute);
app.use("/api", customerRoute);
app.use("/api", valetRoute);

//Starting server
const port = process.env.SERVERPORT;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});