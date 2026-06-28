import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

/* ==========================================
   LOGIN
========================================== */

export const login = async (req, res) => {
  try {
    const { password } = req.body;

    // Check if password is provided
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    /* ==========================================
       DEBUG LOGS
    ========================================== */

    console.log("\n====================================");
    console.log("Entered Password :", password);
    console.log("Password Length  :", password.length);

    console.log("\nHash From .env:");
    console.log(process.env.PASSWORD_HASH);

    console.log(
      "\nHash Length :",
      process.env.PASSWORD_HASH
        ? process.env.PASSWORD_HASH.length
        : "NOT FOUND"
    );

    /* ==========================================
       PASSWORD CHECK
    ========================================== */

    const isMatch = await bcrypt.compare(
      password,
      process.env.PASSWORD_HASH
    );

    console.log("\nPassword Match :", isMatch);
    console.log("====================================\n");

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    /* ==========================================
       GENERATE JWT
    ========================================== */

    const token = generateToken();

    /* ==========================================
       SAVE COOKIE
    ========================================== */

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful 🌸",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ==========================================
   LOGOUT
========================================== */

export const logout = (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
};

/* ==========================================
   CHECK AUTH
========================================== */

export const checkAuth = (req, res) => {
  return res.status(200).json({
    success: true,
    authenticated: true,
  });
};