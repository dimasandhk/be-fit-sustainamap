const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashedPW = await bcrypt.hash(user.password, salt);

  user.password = hashedPW;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
