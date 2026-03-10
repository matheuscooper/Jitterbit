const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { generateToken } = require("@config/jwt");

const authRouter = Router();

// senha original: 123456
const mockUser = {
  id: 1,
  email: "admin@jitterbit.com",
  passwordHash: bcrypt.hashSync("123456", 10),
};

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== mockUser.email) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, mockUser.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken({
      sub: mockUser.id,
      email: mockUser.email,
    });

    return res.status(200).json({
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
});

module.exports = authRouter;
