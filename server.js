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

app.get("/", (reg, res) => {
    res.send("Hello World=))");
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect("/auth/login");
    } else {
        next();
    }
};
app.get("/api/exhibits", (reg, res) => {
    res.send(state);
});
app.listen(5000, function () {
    console.log("API app start");
});
