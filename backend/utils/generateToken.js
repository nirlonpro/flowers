import jwt from "jsonwebtoken";

const generateToken = () => {
  return jwt.sign(
    {
      authenticated: true,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export default generateToken;