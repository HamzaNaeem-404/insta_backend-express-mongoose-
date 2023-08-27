import { Router } from "express";
import UserController from "../controller/user.js";
import loginController from "../controller/auth.js";
import loginAuth from "../middleware/loginAuthorization.js";
import userValidator from "../validator/userValidator.js";

const userRouter = new Router();
userRouter.get("/users", UserController.getAll);
userRouter.get("/user/:id", UserController.getSingle);

userRouter.post("/user", userValidator.create, UserController.create);

userRouter.put("/user/:id", UserController.update);

userRouter.get("/user-delete/:id", UserController.delete);

userRouter.post("/login", loginController.login);

export default userRouter;
