const express = require("express");
const { getScoreAndTips } = require("../utils/skorhijau");

const router = express.Router();

router.get("/skorhijau", (req, res) => {
  const data = req.query;

  if (!data.km || !data.aqi || !data.forestCoverage) {
    res.status(400).send({
      success: false,
      msg: "KM, AQI, and Forest Coverage data must be provided!"
    });
  }

  const tips = getScoreAndTips(data.km, data.aqi, data.forestCoverage);
  res.send({
    success: true,
    msg: "Skor Hijau retreived",
    data: tips
  });
});

module.exports = router;
