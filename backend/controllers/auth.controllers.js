const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const sendEmail = require("../utils/sendEmail");
const { mongoose } = require("mongoose");

exports.getOttp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findById(req.user.data[1]);

    const OTTPcode = `${Math.floor(1000 + (Math.random() * 9000))}`;
    const hashedOTTPcode = await bcrypt.hash(OTTPcode, 10);
  
    user.verificationOttp = hashedOTTPcode;
    user.verificationOttpExpire = Date.now() + 3600000;

    await user.save();

    const html = `<p> Enter <b> ${OTTPcode} </b> in the app to verify your email address. </p>`;

    await sendEmail({
      email: email,
      subject: "OTTP Verification Service",
      html
    })

    res.status(200).json({
      success: true,
      message: `OTTP sent to ${email} successfully`
    })
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
}

exports.verifyOttp = async (req, res, next) => {
  try {
    const { code, email } = req.body;
    const user = await User.findById(req.user.data[1]);
    if (!user) {
      return next(new ErrorResponse("User not found", 400));
    }

    const user2 = await User.findOne({
      phoneNumber: user.phoneNumber,
      verificationOttpExpire: { $gt: Date.now() }
    })
    if (!user2) {
      return next(new ErrorResponse("User not found", 400));
    }

    const isOTTPmatched = await bcrypt.compare(code, user2.verificationOttp);
    if (!isOTTPmatched) {
      return next(new ErrorResponse("Code is invalid or has been expired", 400));
    }    

    user2.verificationOttp = null;
    user2.verificationOttpExpire = null;
    user2.email = email;

    await user2.save();

    res.status(200).json({
      success: true,
      message: `Successfully updated`
    })
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
}

exports.userSignup = async (req, res, next) => {
  try {
    req.body.password = "ochuba4444";
    const result = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (!result) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      let user = new User({
        ...req.body,
        password: hash,
      });

      const token = jsonwebtoken.sign(
        {
          data: [user.email, user._id],
          admin: user.admin,
        },
        "" + process.env.JWT_SECRET
      );

      const result = await user.save();

      if (!result) {
        return next(new ErrorResponse("Signup failed", 400));
      }
      result.password = undefined;
      return res.status(200).json({
        success: true,
        message: "Successfully Created the user",
        token: token,
        user: result,
      });
    } else {
      // email did exist
      // so lets match password
      if (bcrypt.compareSync(req.body.password, result.password)) {
        // great, allow this user access
        const token = jsonwebtoken.sign(
          {
            data: [result.email, result._id],
            admin: result.admin,
          },
          "" + process.env.JWT_SECRET
        );
        result.password = undefined;
        return res.status(200).json({
          success: true,
          message: "Successfully Logged in",
          token: token,
          user: result,
        });
      } else {
        return next(new ErrorResponse("Incorrect password", 200));
      }
    }
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse(err, 400));
  }
};

exports.userUpdate = async (req, res, next) => {
  try {
    const data = {
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber
    }

    const result = await User.findByIdAndUpdate(req.params.id, data);

    if (!result) {
      return next(new ErrorResponse("Update failed", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Successfully Update the user",
      user: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
      user: [],
    });
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const result = await User.findOne({ email: req.body.email });
    if (!result) {
      // this means result is null
      return next(new ErrorResponse("Incorrect Phone Number", 200));
    } else {
      // email did exist
      // so lets match password
      if (bcrypt.compareSync(req.body.password, result.password)) {
        // great, allow this user access
        const token = jsonwebtoken.sign(
          {
            data: [result.email, result._id],
            admin: result.admin,
          },
          "" + process.env.JWT_SECRET
        );
        result.password = undefined;
        return res.status(200).json({
          success: true,
          message: "Successfully Logged in",
          token: token,
          user: result,
        });
      } else {
        return next(new ErrorResponse("Incorrect password", 200));
      }
    }
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});

    if (allUsers) {
      return res.status(200).json({
        success: true,
        message: "Got All Users Successfully",
        data: allUsers,
      });
    }
    return res.status(200).json({
      success: false,
      message: "No User Found",
      data: [],
    });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getSingleUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.user.data[1]);
    user.password = undefined;
    if (user) {
      return res.status(200).json({
        success: true,
        message: "user found",
        data: user,
      });
    }
    return res.status(200).json({
      success: true,
      message: "user not found",
      data: user,
    });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};
