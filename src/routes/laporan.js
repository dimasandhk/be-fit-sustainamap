const express = require("express");
const Laporan = require("../models/Laporan");
const User = require("../models/User");
const router = express.Router();
const { ensureAuth } = require("../utils/jwt");

const upload = require("../config/multer");

router.post("/", ensureAuth, upload.single("photo"), async (req, res) => {
  const data = req.body;
  const file = req.file.path;
  if (!file) {
    res.status(400).send({
      status: false,
      data: "No File is selected."
    });
  }

  if (!data.title || !data.description || !data.latitude || !data.longitude) {
    return res.status(400).send({
      success: false,
      msg: "title, description, latitude, and longitude is required!"
    });
  }

  const userFound = await User.findById(req._id);
  if (!userFound) {
    return res.status(401).send({
      success: false,
      msg: `User with id ${id} not found`
    });
  }

  const uploadedPhoto = file
    .split("uploads")
    [file.split("uploads").length - 1].substring(1);
  try {
    let filteredData = {
      userId: req._id,
      title: data.title,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      photo: uploadedPhoto
    };
    const nLaporan = await new Laporan({
      ...filteredData
    });

    await nLaporan.save();

    res.send({
      success: true,
      msg: "Laporan created",
      data: {
        userId: nLaporan.userId,
        title: nLaporan.title,
        description: nLaporan.description,
        latitude: nLaporan.latitude,
        longitude: nLaporan.longitude,
        photo: nLaporan.photo,
        _id: nLaporan._id,
        createdAt: nLaporan.createdAt,
        updatedAt: nLaporan.updatedAt
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const Laporans = await User.find({});

    res.send({
      success: true,
      msg: "Laporan retrieved",
      data: Laporans
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/me", ensureAuth, async (req, res) => {
  const userFound = await User.findById(req._id);
  if (!userFound) {
    return res.status(401).send({
      success: false,
      msg: `User with id ${id} not found`
    });
  }

  try {
    const userLaporans = await Laporan.find({ userId: userFound._id });

    res.send({
      success: true,
      msg: `Laporan by ${userFound.email} retrieved`,
      data: userLaporans
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
