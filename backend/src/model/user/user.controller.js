const User = require("./user.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = await User({ name, email, password });
    user.save();

    const token = jwt.sign({ id: user.name }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select(["-password"]);
    if (!users) return res.status(404).json({ message: "Users not found" });
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

const getUserInfo = async (req, res) => {
  
  if (!req.user) {
    return res.status(401).json({ msg: 'Not authenticated' });
  }

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });

};

const toggleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isAdmin = isAdmin;
    await user.save();

    res.status(200).json({
      message: `User role updated to ${isAdmin ? "Admin" : "Customer"}`,
    });
  } catch (err) {
    console.error("Toggle admin error:", err.message);
    res.status(500).json({ message: "Failed to update user role" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Logged in" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

module.exports = {
  register,
  toggleAdmin,
  login,
  logout,
  getUserInfo,
  getAllUsers,
  deleteUser,
};
