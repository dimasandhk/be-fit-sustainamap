const mongoose = require("mongoose");

const laporanSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User"
    },
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },

    photo: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Laporan = mongoose.model("Laporan", laporanSchema);

module.exports = Laporan;
