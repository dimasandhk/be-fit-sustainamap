const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

require("dotenv").config();

const { getToken, ensureAuth } = require("../utils/jwt");

router.post("/register", async (req, res) => {
  const data = req.body;

  if (!data.email || !data.password) {
    res.status(400).send({
      sucess: false,
      msg: "Email and Password are required"
    });
  }

  try {
    const nUser = await new User({
      email: data.email,
      password: data.password
    });

    const prevUser = await User.findOne({ email: nUser.email });
    if (prevUser) {
      return res.status(400).send({
        success: false,
        msg: "User with that email is already exist!"
      });
    }

    await nUser.save();

    const token = getToken(nUser._id);
    res.status(201).send({
      success: true,
      msg: "User created",
      data: {
        token: token,
        _id: nUser._id,
        email: nUser.email,
        createdAt: nUser.createdAt
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  const data = req.body;

  if (!data.email || !data.password) {
    res.status(400).send({
      sucess: false,
      msg: "Email and Password are required",
      data: {}
    });
  }

  try {
    const userFound = await User.findOne({ email: data.email });
    if (!userFound) {
      return res.status(404).send({
        success: false,
        msg: "User not found!"
      });
    }

    const correctPassword = await bcrypt.compare(
      data.password,
      userFound.password
    );

    if (!correctPassword) {
      return res.status(401).send({
        success: false,
        msg: "Your email or password is incorrect"
      });
    }

    const token = getToken(userFound._id);
    res.send({
      success: true,
      msg: "User logged in!",
      data: {
        token: token,
        _id: userFound._id,
        email: userFound.email,
        createdAt: userFound.createdAt
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/me", ensureAuth, async (req, res) => {
  const id = req._id;

  try {
    const currentUser = await User.findById(id);
    res.send({
      success: true,
      msg: "User authenticated",
      data: {
        _id: currentUser._id,
        email: currentUser.email,
        createdAt: currentUser.createdAt
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
