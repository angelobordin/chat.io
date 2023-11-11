import { UserService } from "../service/user-service.js";

export class UserController {
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * @returns
	 */
	static async registerUser(req, res) {
		try {
			const newUserData = req.body;
			const service = new UserService();
			const result = await service.registerUser(newUserData);

			return res.send(result);
		} catch (error) {
			return res.status(500).send(error);
		}
	}
}
