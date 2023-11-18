import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ message: "All Users Fetched", allUsers });
  } catch (error) {
    res.status(400).json({ message: "didn't find any users", error });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const newUpdatedUser = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "User updated successfully", newUpdatedUser });
  } catch (error) {
    res.status(400).json({ message: "User: failed to edit", error });
  }
};


export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(200).json({ message: "User already deleted or not found" });

    res.status(200).json({ message: "User deleted successfully", user });

  } catch (error) {
    res.status(500).json({ message: "You're not authorize to delete users", error });
  }
};
