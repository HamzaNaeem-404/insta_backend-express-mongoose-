import { Router } from "express";
import postRouter from "./post.js";
import userRouter from "./user.js";

const mainRouter = new Router();

mainRouter.use(userRouter);
mainRouter.use(postRouter);

export default mainRouter;
