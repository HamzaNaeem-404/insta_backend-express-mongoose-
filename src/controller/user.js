import userModel from "../model/User.js";
import bcryptjs from "bcryptjs";

const UserController = {
  getAll: async (req, res) => {
    const users = await userModel.find();
    return res.json(users);
  },
  getSingle: async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  },
  create: async (req, res) => {
    const { name, email, password } = req.body;

    const hashPassword = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    return res.json({ message: "User created", user });
  },
  update: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (body.name) { user.name = body.name; }

    if (body.email) { user.email = body.email; }

    if (body.password) { user.password = body.password; }

    await user.save();
    return res.json({ message: "User Updated", user });
  },

  delete: async (req, res) => {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await userModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted" });
  },


};

export default UserController;
