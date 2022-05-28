const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { registerValidation, loginValidation } = require("../utils/validation");
const { createSecureToken, createRefreshToken } = require("../routes/token");
const { error_json, success_json } = require("../utils/helpers");
const knex = require("../knex");

module.exports = class AuthService {
  static async login(credentials) {
    // check if data is valid
    const { error } = loginValidation(credentials);
    if (error) return error_json(400, "Email or Password invalid!");
    // return error_json(400, error.details[0].message);

    // Check if user exists
    const user = await User.findOne({ email: credentials.email });
    // console.log(user);
    // console.log(user);
    if (!user) return error_json(400, "Email or Password invalid!");

    // check if password hash OK
    const result = await bcrypt.compare(credentials.password, user.password);
    if (!result) return error_json(400, "Email or Password invalid!");


    // create and assign JWT token
    const accessToken = createSecureToken(user._id);
    if (!accessToken) return error_json(500, "Error creating token");

    const refreshToken = createRefreshToken(user._id);
    if (!refreshToken) return error_json(500, "Error creating token");

    const userData = {
      first_name: user._doc.fname,
      last_name: user._doc.lname,
      nrc: user._doc.nrc,
      email: user._doc.email,
      account: user._doc.accountNumber,
      phone: user._doc.phone,
      dob: user._doc.dob,
      photoUri: user._doc.photoUri,
      isActive: user._doc.isActive,
      id: user._doc._id,
    };

    // console.log(userData);

    const response = {
      userData,
      accessToken,
      refreshToken,
    };

    return success_json(200, response);
  }

  static async register(data) {
    // Check if data is valid
    const { error } = registerValidation(data);
    if (error) return error_json(400, error.details[0].message);

    // Check if user exists
    const userphoneExist = await
      knex()
        .select()
        .from("customers")
        .where({ phone: data.phone })
        .then(phoneNumber => {
          console.log(phoneNumber);
          
          if (phoneNumber.length != 0) {
            const errorEmail = {
              errorMsg: "This Phone number is already in use.",
            };
            // console.log(userphoneExist);
            if (userphoneExist) return error_json(400, errorEmail);

          }
        })


    const emailExist = await User.findOne({ email: data.email });
    const errorUsername = {
      errorMsg: "This email is already in use.",
    };
    if (emailExist) return error_json(400, errorUsername);

    // check if passwords match
    // if (data.password !== data.confirm_password)
    //     return error_json(400, "Passwords doesn't match");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Create and save the user
    const user = new User({
      fname: data.first_name,
      lname: data.last_name,
      dob: data.dob,
      password: hashedPassword,
      email: data.email,
      accountNumber: data.account,
      nrc: data.nrc,
      photoUri: data.photo,
      isActive: false,
    });

    const userData = {
      first_name: data.first_name,
      email: data.email,
      fullName: "",
      avatar: null,
    };

    var registeredUser = await user.save();
    if (!registerValidation)
      return error_json(500, "Error registering user ... please try again");

    var privateKey = process.env.PRIVATE_KEY;

    const accessToken = jwt.sign({ id: user._id }, privateKey, {
      expiresIn: "12h",
    });
    const userInfo = Object.assign({}, userData);
    const response = { userInfo, accessToken };
    // Send Email
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.REACT_APP_EMAIL,
        pass: process.env.REACT_APP_EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: 'myemail@gmail.com',
      to: "receiver@example.com",
      subject: `The subject goes here`,
      html: `The body of the email goes here in HTML`,
      attachments: [
        {
          filename: `${name}.pdf`,
          path: path.join(__dirname, `../../src/assets/books/${name}.pdf`),
          contentType: 'application/pdf',
        },
      ],
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.json(err);
      } else {
        res.json(info);
      }
    });

    // console.log(response);

    return success_json(200, response);
  }
};
