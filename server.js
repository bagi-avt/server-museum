const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const mongoose = require("mongoose");
const passport = require("passport");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const keys = require("./config/keys");
const state = require("./local-state");
const cors = require("cors");
const app = express();

mongoose
    .connect(
        keys.mongodb.dbURL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => console.log("connet mongodb OK")
    )
    .then(() => console.log("connet mongodb OK"))
    .catch((err) => console.log(err));

app.use(cors());

app.use(
    session({
        secret: "hghtyNN23h",
        store: new FileStore(),
        cookie: {
            path: "/",
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        },
        resave: false,
        saveUninitialized: false,
    })
);

app.use("/api/auth", authRoutes);

app.get("/", (reg, res) => {
    res.send("Hello World=))");
});
app.get("/api/exhibits", (reg, res) => {
    res.send(state);
});
app.listen(5000, function () {
    console.log("API app start");
});
