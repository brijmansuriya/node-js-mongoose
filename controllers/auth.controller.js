const bcrypt = require("bcryptjs");
const path = require("path");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
console.log(":::::::::: controllers admins.controller.js");

const register = async (req, res) => {
  console.log(":::::auth.::::::::::::");
  try {
    console.log(":::::auth.controller.js");
    const { username, phone, email, password } = req.body;
    const OldUser = await UserModel.findOne({ email: email });
    if (OldUser) {
      return res.send({
        massage: "email is already registered",
        success: false,
        data: email,
      });
    }
    const encPassword = await bcrypt.hash(password, 12);
    const user_data = await UserModel.create({
      username,
      phone,
      email,
      password: encPassword,
    });
    // Create token
    const token = jwt.sign(
      { user_id: user_data._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "42h" }
    );
    return res.send({
      token: token,
      message: "User Register successfully",
      success: true,
    });
  } catch (error) {
    console.log(":::: register chtch:::::", error.message);
    return res
      .status(500)
      .send({ message: error.message, success: false, data: {} });
  }
};

const login = async (req, res) => {
  console.log("::::::::::::::login");
  try {
    const { email, password } = req.body;
    const OldUser = await UserModel.findOne({ email: email });

    if (!OldUser) {
      return res.send({
        message: "User not found",
        success: false,
      });
    }

    if (OldUser && (await bcrypt.compare(password, OldUser.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: OldUser._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "42h" }
      );
      OldUser.token = token;

      return res.send({
        token: OldUser.token,
        message: "User login successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log("chtch:::: register chtch:::::", error.message);
    return res.status(500).send({ message: error.message, success: false });
  }
};

const userlist = async (req, res) => {
  try {
    const UserList = await UserModel.find({});
    if (UserList) {
      return res.send({
        massage: "User list",
        success: true,
        data: UserList,
      });
    } else {
      return res.send({
        massage: "User list is emty",
        success: false,
        data: UserList,
      });
    }
  } catch (error) {
    console.log("::::::chtch userlist ", error.message);
    return res
      .status(500)
      .send({ message: error.message, success: false, data: {} });
  }
};

const userDelete = async (req, res) => {
  try {
    const user_id = req.params.id;
    const UserList = await UserModel.deleteOne({ _id: user_id });
    console.log(UserList);
    if (UserList.deletedCount > 0) {
      return res.send({
        massage: "User deleted successfully",
        success: true,
        data: UserList,
      });
    } else {
      return res.send({
        massage: "Record not found",
        success: false,
        data: req.params.id,
      });
    }
  } catch (error) {
    console.log("::::::chtch userDitile ", error.message);
    return res
      .status(500)
      .send({ message: error.message, success: false, data: {} });
  }
};

const userDetails = async (req, res) => {
  try {
    const user_id = req.params.id;
    console.log(user_id);
    const UserList = await UserModel.deleteOne({ _id: user_id });
    console.log(UserList);
    if (UserList.deletedCount > 0) {
      return res.send({
        massage: "User deleted successfully",
        success: true,
        data: UserList,
      });
    } else {
      return res.send({
        massage: "Record not found",
        success: false,
        data: req.params.id,
      });
    }
  } catch (error) {
    console.log("::::::chtch userDitile ", error.message);
    return res
      .status(500)
      .send({ message: error.message, success: false, data: {} });
  }
};

module.exports = { register, userlist, userDelete, login, userDetails };
