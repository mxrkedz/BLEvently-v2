import { asyncError } from "../middlewares/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import {
  sendToken,
  cookieOptions,
  getDataUri,
  sendEmail,
} from "../utils/features.js";
import cloudinary from "cloudinary";

export const register = asyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 400));

  let avatar = undefined;

  if (req.file) {
    const file = getDataUri(req.file);
    const myCloud = await cloudinary.v2.uploader.upload(file.content, {
      folder: "users",
    });
    avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  user = await User.create({
    avatar,
    name,
    email,
    password,
  });

  sendToken(user, res, `Registered successfully`, 201);
});

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Error("Incorrect Email or Password", 400));
  }

  if (!password)
    return next(new ErrorHandler("Please Enter The Password", 400));

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return next(new Error("Incorrect Email or Password", 400));
  }

  const token = user.generateToken();

  sendToken(user, res, `Welcome back, ${user.name}`, 200);
});

export const profile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

export const logout = asyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      ...cookieOptions,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
});

export const updateProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const { name, email } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.status(200).json({
    success: true,
    user,
    message: "Profile Update Succesfully",
  });
});

export const changePassword = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return next(
      new ErrorHandler("Please Enter The Old Password & New Password", 400)
    );

  const isMatched = await user.comparePassword(oldPassword);

  if (!isMatched) return next(new ErrorHandler("Incorrect Old Password", 400));

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    user,
    message: "Password Changed Successfully",
  });
});

export const updateAvatar = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const file = getDataUri(req.file);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  const myCloud = await cloudinary.v2.uploader.upload(file.content);
  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "Avatar Updated Succesfully",
  });
});

export const forgetPassword = asyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("Incorrect Email", 404));
  //max,min 2000,10000
  const randomNumber = Math.random() * (999999 - 100000) + 100000;
  const otp = Math.floor(randomNumber);
  const otp_expire = 15 * 60 * 1000;

  user.otp = otp;
  user.otp_expire = new Date(Date.now() + otp_expire);
  await user.save();

  const message = `Your OTP for Resetting Password is ${otp}.\n Please ignore if you haven't requested this.`;
  try {
    await sendEmail("OTP For Resetting Password", user.email, message);
  } catch (error) {
    user.otp = null;
    user.otp_expire = null;
    await user.save();
    return next(error);
  }
  //sendEmail()

  res.status(200).json({
    success: true,
    message: `Email sent to ${user.email}`,
  });
});

export const resetPassword = asyncError(async (req, res, next) => {
  const { otp, password } = req.body;

  const user = await User.findOne({
    otp,
    otp_expire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(new ErrorHandler("Incorret OTP or has been expired", 400));

  if (!password)
    return next(new ErrorHandler("Please Enter New Password", 400));

  user.password = password;
  user.otp = undefined;
  user.otp_expire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Change Successfully, You can login now",
  });
});
