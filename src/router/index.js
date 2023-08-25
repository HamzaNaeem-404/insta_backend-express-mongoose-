import { Router } from "express";
import postRouter from "./post.js";
import userRouter from "./user.js";
import otpRouter from "./otp.js";

const mainRouter = new Router();

mainRouter.use(userRouter);
mainRouter.use(postRouter);
mainRouter.use(otpRouter);

export default mainRouter;
