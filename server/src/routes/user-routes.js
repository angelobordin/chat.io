import { Router } from "express";
import { UserController } from "../controller/user-controller.js";

const UserRoutes = Router();

UserRoutes.post("/user/signup", UserController.registerUser);
UserRoutes.post("/user/signin", UserController.loginUser);

export default UserRoutes;
