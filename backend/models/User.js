const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // use bcryptjs for async/await support

const { Schema } = mongoose;

// creating user schema
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
});

// Encrypt password before saving a model
userSchema.pre('save', async function (next) {
  const user = this;
  
  if (!user.isModified('password')) return next(); // Only hash password if it's modified

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Comparing saved hashed password and provided password during sign-in
userSchema.methods.comparePasswords = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model('user', userSchema);

module.exports = User;
