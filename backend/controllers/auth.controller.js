import { User } from "../models/user.model.js";

export const userRegistration = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await new User({ email, username, password }).save();
    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: "User already exists", error });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "No User found, Register first" });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "User login successfull", user });
  } catch (error) {
    console.log("I run");
    res.status(500).json({ message: "Internal server error", error });
  }
};
