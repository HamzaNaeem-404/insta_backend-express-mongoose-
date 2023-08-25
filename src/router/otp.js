import { Router } from "express";
import otpController from "../controller/otpController.js";

const otpRouter = new Router();


otpRouter.post("/otp/", otpController.verify);

otpRouter.get("/otp/:email", otpController.generate);

export default otpRouter;