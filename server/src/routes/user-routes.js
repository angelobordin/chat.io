import { Router } from "express";
import { UserController } from "../controller/user-controller.js";
import { authenticationMiddleware } from "../util/middleware/authentication.js";

const UserRoutes = Router();

UserRoutes.post("/user/logout", UserController.logoutUser);
UserRoutes.post("/user/signup", UserController.registerUser);
UserRoutes.post("/user/signin", UserController.loginUser);

UserRoutes.get("/user/list", authenticationMiddleware, UserController.getUserList);

export default UserRoutes;
