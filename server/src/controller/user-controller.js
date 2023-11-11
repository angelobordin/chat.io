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
			if (error instanceof Error) {
				return res.status(500).send(error.message);
			}

			return res.status(500).send(error);
		}
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * @returns
	 */
	static async loginUser(req, res) {
		try {
			const loginUserData = req.body;
			const service = new UserService();
			const result = await service.loginUser(loginUserData);

			return res.send(result);
		} catch (error) {
			if (error instanceof Error) {
				return res.status(500).send(error.message);
			}

			return res.status(500).send(error);
		}
	}
}
