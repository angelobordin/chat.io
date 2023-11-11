import { Router } from "express";
import { UserController } from "../controller/user-controller.js";

const UserRoutes = Router();

UserRoutes.post("/user/register", UserController.registerUser);

export default UserRoutes;
