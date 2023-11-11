import { Router } from "express";
import { UserController } from "../controller/user-controller.js";

const UserRoutes = Router();

UserRoutes.post("/user/register", UserController.registerUser);
UserRoutes.post("/user/login", UserController.loginUser);

export default UserRoutes;
