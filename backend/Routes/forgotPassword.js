const express = require("express");
const router = express.Router();

const User = require("../Model/User");

// Generate random password (letters only)
function generatePassword(length = 8) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let password = "";

  for (let i = 0; i < length; i++) {
    password += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  return password;
}

router.post("/forgotPassword", async (req, res) => {
  try {
    const { email, phone } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const today = new Date().toDateString();

    if (
      user.lastPasswordReset &&
      new Date(user.lastPasswordReset).toDateString() === today
    ) {
      return res.status(400).json({
        success: false,
        message: "You can use this option only once per day.",
      });
    }

    const newPassword = generatePassword(8);

    user.password = newPassword;
    user.lastPasswordReset = new Date();

    await user.save();

    res.json({
      success: true,
      message: "Password reset successfully",
      newPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;