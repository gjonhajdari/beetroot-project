// Components from the passport-jtw module. Used to define and configure a JWT authentication strategy
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJtw = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
// Creating a reference to the 'users' collection in MongoDB using mongoose
const User = mongoose.model("users");

const keys = require("../config/keys");

// Object that holds options for the JWT strategy
const opts = {};

// Specifies how the JWT should be extracted from the incoming request
opts.jwtFromRequest = ExtractJtw.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          done(null, false);
        })
        .catch((error) => console.log(error));
    })
  );
};
