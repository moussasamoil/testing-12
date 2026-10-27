import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { signIn, signUp ,getUsers } from "./user.service.js";
import { authorization } from "../../utils/authorization.js";


export const userRouter = Router();

userRouter.post("/signUp", asyncHandler(signUp));
userRouter.post("/signIn", asyncHandler(signIn));
userRouter.get("/getUsers", authorization, asyncHandler(getUsers));