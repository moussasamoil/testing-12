import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { signIn, signUp ,getUsers } from "./user.service.js";
import { authenticate } from "../../utils/authenticate.js";
import { authorization } from "../../utils/authorization.js";
import { userRole } from "../../DB/models/user.js";


export const userRouter = Router();

userRouter.post("/signUp", asyncHandler(signUp));
userRouter.post("/signIn", asyncHandler(signIn));
userRouter.get("/getUsers", authenticate, authorization(userRole.admin), asyncHandler(getUsers));