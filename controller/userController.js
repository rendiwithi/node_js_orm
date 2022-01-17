const model = require("../model/index");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
require("dotenv").config();
controller = {};

controller.getUser = async function (req, res) {
  try {
    await model.user.findAll().then((result) => {
      if (result.length > 0) {
        res.status(200).json({ message: "connection succed", data: result });
      } else {
        res.status(200).json({ message: "connection succed", data: [] });
      }
    });
  } catch (error) {
    res.send(404).json({ message: error });
  }
};

controller.register = async function (req, res) {
  // Our register logic starts here
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    let userCheck = await model.user.findAll({
      where: { [Op.or]: [{ username: username }, { password: password }] },
    });

    if (userCheck.length > 0) {
      res.status(400).send("username and password are already in use");
    } else {
      const token = jwt.sign(
        {
          username: username,
          password: password,
          //   exp: Math.floor(Date.now() / 1000) + (60 * 2),
          iat: Math.floor(Date.now()),
        },
        process.env.TOKEN_JWT,
        {
          expiresIn: "24h",
        }
      );
      const user = await model.user.create({
        username: username,
        password: password,
        token: token,
      });
      res.status(201).json(user);
    }
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

controller.login = async function (req, res) {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("username and password are required");
    }
    const userCek = await model.user.findAll({
      where: { [Op.and]: [{ username: username }, { password: password }] },
    });
    if (userCek.length > 0) {
      const token = jwt.sign(
        {
          username: username,
          password: password,
          //   exp: Math.floor(Date.now() / 1000) + (60 * 2),
          iat: Math.floor(Date.now()),
        },
        process.env.TOKEN_JWT,
        {
          expiresIn: "24h",
        }
      );
      await model.user.update(
        {
          token: token,
        },
        {
          where: { [Op.and]: [{ username: username }, { password: password }] },
        }
      );
      const userUpdate = await model.user.findAll({
        where: { [Op.and]: [{ username: username }, { password: password }] },
      });
      res.status(200).json(userUpdate);
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {}
};
controller.updateUser = async function (req, res) {
  const { username, password, token } = req.body;
  let userCheck = await model.user.findAll({
    where: { [Op.and]: [{ token: token }] },
  });
  let userDuplicate = await model.user.findAll({
    where: { [Op.or]: [{ username: username }, { password: password }] },
  });
  if (userCheck.length > 0) {
    if (userDuplicate.length < 1) {
      const token = jwt.sign(
        {
          username: username,
          password: password,
          //   exp: Math.floor(Date.now() / 1000) + (60 * 2),
          iat: Math.floor(Date.now()),
        },
        process.env.TOKEN_JWT,
        {
          expiresIn: "24h",
        }
      );
      await model.user.update(
        {
          token: token,
        },
        {
          where: { [Op.and]: [{ username: username }, { password: password }] },
        }
      );
      const userUpdate = await model.user.findAll({
        where: { [Op.and]: [{ username: username }, { password: password }] },
      });
      res.status(200).json(userUpdate);
    }else{
    res.status(404).json({ message: "username and password already in use" });

    }
  } else {
    res.status(404).json({ message: "username and password do not match" });
  }
};
module.exports = controller;
