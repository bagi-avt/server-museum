const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const keys = require("./config/keys");
const state = require("./local-state");
const cors = require("cors");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
var fs = require("fs");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());

app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.seesion.cookieKey],
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
    .connect(keys.mongodb.dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connet mongodb OK"))
    .catch((err) => console.log(err));
app.use(cors());

app.use("/api/auth", authRoutes);

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.err();
    } else {
        next();
    }
};
app.use("/api/profile", authCheck, (req, res) => {
    res.send(req.user);
});
app.get("/api/categories", authCheck, (req, res) => {
    res.send(state);
});
app.use("/api/exhibits", require("./routes/exhibits-routes"));

app.use("/static", express.static("data"));

app.listen(5000, function () {
    console.log("API app start");
});
