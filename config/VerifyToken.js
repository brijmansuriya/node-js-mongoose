var jwt = require("jsonwebtoken");
var config = require("./config");
const Users = require("../models/user.model.js");
const Customer = require("../models/customer.model.js");
const Admin = require("../models/admin.model.js");
const Provider = require("../models/provider.model.js");

function verifyToken(req, res, next) {
  var token = req.headers["x-access-token"]
    ? req.headers["x-access-token"]
    : req.headers["authorization"];

  var userType = req.headers["user-type"];

  console.log("---------token------------", token);

  if (!token) {
    var response = { success: false, auth: false, msg: "No token provided" };
    return res.status(403).send(response);
  }
  jwt.verify(token, config.secret, function (err, decoded) {
    console.log("----------err------", err);
    console.log("----------decode------", decoded);
    if (err) {
      console.log(err);
      var response = {
        success: false,
        auth: false,
        msg: "Failed to authenticate token",
      };
      return res.status(401).send(response);
    }

    if (userType == "Customer") {
      Customer.findOne({ _id: decoded.id }, { status: 1, is_deleted: 1 }).then(
        (result) => {
          console.log("-------------result----------", result);
          if (result.is_deleted === 1) {
            var response2 = {
              success: false,
              auth: false,
              msg: "User is deleted or not found",
            };
            return res.status(403).send(response2);
          } else if (result.status === 0) {
            var response3 = {
              success: false,
              auth: false,
              msg: "User is inactive now. Contact to admin.",
            };
            return res.status(403).send(response3);
          } else {
            req.userId = decoded.id;
            req.user_type = decoded.user_type;
            next();
          }
        }
      );
    } else if (userType == "Admin") {
      Admin.findOne({ _id: decoded.id }, { status: 1, is_deleted: 1 }).then(
        (result) => {
          console.log("-------------result----------", result);
          if (result.is_deleted === 1) {
            var response2 = {
              success: false,
              auth: false,
              msg: "User is deleted or not found",
            };
            return res.status(403).send(response2);
          } else if (result.status === 0) {
            var response3 = {
              success: false,
              auth: false,
              msg: "User is inactive now. Contact to admin.",
            };
            return res.status(403).send(response3);
          } else {
            req.userId = decoded.id;
            req.user_type = decoded.user_type;
            next();
          }
        }
      );
    } else {
      Provider.findOne({ _id: decoded.id }, { status: 1, is_deleted: 1 }).then(
        (result) => {
          console.log("-------------result----------", result);
          if (result.is_deleted === 1) {
            var response2 = {
              success: false,
              auth: false,
              msg: "User is deleted or not found",
            };
            return res.status(403).send(response2);
          } else if (result.status === 0) {
            var response3 = {
              success: false,
              auth: false,
              msg: "User is inactive now. Contact to admin.",
            };
            return res.status(403).send(response3);
          } else {
            req.userId = decoded.id;
            req.user_type = decoded.user_type;
            next();
          }
        }
      );
    }
  });
}

module.exports = verifyToken;
