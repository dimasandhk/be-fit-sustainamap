const express = require("express");
const skorHijauRoutes = require("./routes/skorhijau");
const userRoutes = require("./routes/user");
const laporanRoutes = require("./routes/laporan");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sustainamap";

mongoose.connect(URI).then(() => {
  console.log("Connected to Mongodb");
});

app.use("/uploads", express.static("public/uploads"));

app.use(cors());
app.use(express.json());
app.use("/", skorHijauRoutes);
app.use("/auth", userRoutes);
app.use("/laporan", laporanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
