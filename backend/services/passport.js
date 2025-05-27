const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const secret = "jksjkdfdnssdjnvjos65";

// Local strategy (login with email + password)
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'Invalid email' });
    }

    const isMatch = await user.comparePasswords(password);

    if (!isMatch) {
      return done(null, false, { message: 'Invalid password' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

// JWT strategy (for protected routes)
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
});

// Register strategies
passport.use(jwtLogin);
passport.use(localLogin);
