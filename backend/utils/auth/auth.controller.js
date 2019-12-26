import User from "../../resources/user/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateObject } from "../validation";

//Token Validation
export const protectRoute = (req, res, next) => {
  jwt.verify(req.header.token, process.env.TOKEN_SECRET, function(
    err,
    decoded
  ) {
    if (err) {
      res.status(401).json({ error: "Invalid Token" });
    } else {
      req.body.id = decoded.id;
      next();
    }
  });
  if (!validToken) {
    res.status(401).send("Invalid Token");
  }
};

//Validations
export const validateLogin = async (req, res, next) => {
  const error = validateObject(req.body, "login");

  const user = await User.findOne({ email: req.body.email });

  if (error) {
    res.status(400).json({
      error: error.details[0].message
    });
  } else if (!user) {
    res.status(400).json({
      error: "User not found"
    });
  } else {
    req.user = user;
    next();
  }
};

export const validateSignup = async (req, res, next) => {
  try {
    const error = validateObject(req.body, "signup");

    const email = await User.findOne({ email: req.body.email });

    if (error) {
      res.status(400).json({
        error: error.details[0].message
      });
    } else if (email) {
      res.status(400).json({
        error: "Email Already Exists"
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

//Controllers
export const loginController = async (req, res) => {
  const validPassowrd = bcrypt.compare(req.body.password, req.user.password);
  if (!validPassowrd) {
    return res.status(400).json({
      error: "Invalid Password"
    });
  } else {
    const token = jwt.sign(
      {
        id: req.user._id
      },
      process.env.TOKEN_SECRET
    );

    res.json({
      token
    });
  }
};
export const signupController = async (req, res) => {
  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const insertedUser = await newUser.save();
    const { _id } = insertedUser;
    console.log(insertedUser);
    res.json({ _id });
  } catch (error) {
    res.status(400).json({ error });
  }
};
