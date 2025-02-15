const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "first name must be at least 3 characters long"]
    },
    lastname: {
      type: String,
      minlength: [3, "last name must be at least 3 characters long"]
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "email must be at least 5 characters long"]
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId: {
    type: String
  }
});

// generate jwt token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};

// compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// hash password before saving to database
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
