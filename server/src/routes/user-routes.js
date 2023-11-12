import { Router } from "express";
import { UserController } from "../controller/user-controller.js";
import { authenticationMiddleware } from "../util/middleware/authentication.js";

const UserRoutes = Router();

UserRoutes.get("/user/list", authenticationMiddleware, UserController.getUserList);
UserRoutes.post("/user/signup", UserController.registerUser);
UserRoutes.post("/user/signin", UserController.loginUser);

export default UserRoutes;
