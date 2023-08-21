import userModel from "../model/User.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const loginController = {
        login: async (req, res) => {
            const { email, password } = req.body;

            const user = await userModel.findOne({email});

            if(!user){
                return res.json("User Not Found");
            }

            const result = await bcryptjs.compare(password, user.password);

            if(result){
                const token = jwt.sign({user}, process.env.jwt_secret_key ,{
                    algorithm: process.env.secret_algo,
                    expiresIn:"24h",
                });
                return res.json({message: "Login Successful !!", token: token});

            }
else{
                return res.status(404).json("Invalid Credentials !");
            }            
}
}

export default loginController;