import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

// Register
export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;

  // Check if the password and confirmation password match
  if (password !== confPassword) {
    return res.status(400).json({
      status: "error",
      message: "Registrasi gagal",
      errors: {
        password: "Password dan Confirm Password tidak cocok",
      },
    });
  }

  try {
    // Check if the email already exists in the database
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Registrasi gagal",
        errors: {
          email: "Email sudah ada",
        },
      });
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database
    const newUser = await Users.create({
      name,
      email,
      password: hashPassword,
    });

    // Respond with success if the user was created successfully
    res.json({
      status: "success",
      message: "Registration successful",
      data: {
        user: {
          id: newUser.id,
          username: newUser.username, // Assuming your Users model has a username field
          email: newUser.email,
          name: newUser.name,
        },
      },
    });
  } catch (error) {
    console.log(error);
    // Handling other errors
    const errors = {};
    if (error.name === "SequelizeUniqueConstraintError") {
      error.errors.forEach((err) => {
        if (err.path === "username") {
          errors.username = "Username sudah ada";
        }
        if (err.path === "email") {
          errors.email = "Email salah / tidak sesuai";
        }
      });
    }
    res.status(500).json({
      status: "error",
      message: "Registrasi gagal",
      errors: errors,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    // Check if user exists
    if (user.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Email tidak ditemukan",
      });
    }

    const match = await bcrypt.compare(req.body.password, user[0].password);

    // Check if password matches
    if (!match) {
      return res.status(400).json({
        status: "error",
        message: "Password salah",
      });
    }

    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      status: "success",
      message: "Login successful",
      data: {
        token: accessToken,
        user: {
          id: userId,
          username: user[0].username, // Assuming your Users model has a username field
          email: email,
          name: name,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Login gagal",
    });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // Check if refreshToken is missing
  if (!refreshToken) {
    return res.status(204).json({
      status: "error",
      message: "Failed to logout",
    });
  }

  // Find user by refreshToken
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });

  // Check if user not found
  if (!user[0]) {
    return res.status(204).json({
      status: "error",
      message: "Failed to logout",
    });
  }

  const userId = user[0].id;

  // Clear refreshToken in database
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );

  // Clear refreshToken cookie
  res.clearCookie("refreshToken");

  // Respond with success message
  return res.status(200).json({
    status: "success",
    message: "Logout successfully",
  });
};
