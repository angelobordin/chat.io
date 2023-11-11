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
				return res.send({
					status: 400,
					message: error.message,
					error: true,
					data: null,
				});
			}

			return res.send(error);
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
				return res.send({
					status: 400,
					message: error.message,
					error: true,
					data: null,
				});
			}

			return res.send(error);
		}
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * @returns
	 */
	static async getUserList(req, res) {
		try {
			const service = new UserService();
			const result = await service.getUserList();

			return res.send(result);
		} catch (error) {
			if (error instanceof Error) {
				return res.send({
					status: 400,
					message: error.message,
					error: true,
					data: null,
				});
			}

			return res.send(error);
		}
	}
}
