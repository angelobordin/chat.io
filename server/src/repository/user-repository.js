import UserModel from "../model/user-model.js";

export class UserRepository {
	/**
	 *
	 * @param {object} newUserData
	 * @param {string} newUserData.nome - O nome do usuário.
	 * @param {string} newUserData.username - O nome de usuário.
	 * @param {string} newUserData.password - A senha do usuário.
	 * @param {boolean} newUserData.status - Status do usuário.
	 * @returns
	 */
	async registerUser(newUserData) {
		try {
			const result = await UserModel.create({ ...newUserData });

			return result;
		} catch (error) {
			throw error;
		}
	}

	/**
	 *
	 * @param {string} username - O username do usuário.
	 * @returns
	 */
	async getUserByUserName(username) {
		try {
			const result = await UserModel.findOne({ username: username });

			return result;
		} catch (error) {
			throw error;
		}
	}

	async getUserList() {
		try {
			const result = await UserModel.find();

			return result;
		} catch (error) {
			throw error;
		}
	}
}
