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
const foodRoutes = require("./routes/food");

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
app.use("/api",foodRoutes);

app.get("/",(req,res)=>{
    res.redirect()
})

app.get("/sse-server",(req,res,next)=>{
    res.status(200).set({
        "connection": "keep-alive",
        "cache-control": "no-cache",
        "Content-Type" : "text/event-stream"
    })

    res.write(`data: Hello world!\n\n`)
})

//Starting server
const port = process.env.SERVERPORT;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});