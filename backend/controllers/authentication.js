const jwt = require('jwt-simple');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
// const { secret } = require('../config');
const secret = "jksjkdfdnssdjnvjos65";

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}


exports.signup = async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Email and password must be provided' });
  }

  try {
    console.log("email:", email, "password:", password);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use...' });
    }

    const user = new User({ email, password });
    await user.save();

    res.json({ token: tokenForUser(user) });
  } catch (err) {
    next(err);
  }
};

exports.signin = async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Email and password must be provided' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    res.send({ token: tokenForUser(user) });
  } catch (err) {
    next(err);
  }
};
