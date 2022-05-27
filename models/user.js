const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email field is required"],
      max: 255,
      min: [6, "email field must be at least 6 characters"],
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
      max: 1024,
      min: [6, "password field must be at least 6 characters"],
    },
    fname: {
      type: String,
      required: [true, "First name field is required"],
      max: 255,
      min: [2, "First name field must be at least 2 characters"],
    },
    lname: {
      type: String,
      required: [true, "Last name field is required"],
      max: 255,
      min: [2, "Last name field must be at least 2 characters"],
    },
    dob: {
      type: String,
      required: [true, "Date of birth field is required"],
      max: 255,
      min: [2, "Date of birth field must be at least 2 characters"],
    },
    accountNumber: {
      type: String,
      required: [true, "Account Number name field is required"],
      max: 255,
      min: [2, "Account Number field must be at least 2 characters"],
    },
    nrc: {
      type: String,
      required: [true, "NRC field is required"],
      max: 255,
      min: [2, "NRC field must be at least 2 characters"],
    },
    photoUri: {
      type: String,
      required: [true, "Photo Url field is required"],
      max: 255,
      min: [2, "Photo Url field must be at least 2 characters"],
    },
    isActive: {
      type: String,
      required: [true, "isActive field is required"],
      max: 255,
      min: [2, "isActive field must be at least 2 characters"],
    },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.methods.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = mongoose.model("user", UserSchema);
