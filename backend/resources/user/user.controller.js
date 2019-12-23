import UserModel from "./user.model";

export const createUser = (req, res) => {
  res.json({
    message: "New user created"
  });
};

export const getUser = (req, res) => {
  res.json({
    message: "User Details"
  });
};
