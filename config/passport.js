const passport = require("passport");
const LocalStrategy = require("passport-local");
const userDB = {
    id: 1,
    email: "test@mail.ru",
    password: "123",
};
passport.serializeUser(function (user, done) {
    Console.log("Сериализация ", user);
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    Console.log("Десерализация ", id);
    const user = userDB.id === id ? userDB : false;
    done(null, user);
});

passport.use(
    new LocalStrategy({ usernameField: "email" }, function (
        email,
        password,
        done
    ) {
        if (email === userDB.email && passport === userDB.password) {
            return done(null, userDB);
        } else {
            return done(null, false);
        }
    })
);
