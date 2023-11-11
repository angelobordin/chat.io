import { Collection } from "mongodb";

export class UserRepository {
	/**
	 *
	 * @param {object} newUserData
	 * @param {string} newUserData.nome - O nome do usuário.
	 * @param {string} newUserData.username - O nome de usuário.
	 * @param {string} newUserData.password - A senha do usuário.
	 * @param {boolean} newUserData.status - Status do usuário.
	 *
	 * @param {Collection} userCollection
	 * @returns
	 */
	async registerUser(newUserData, userCollection) {
		try {
			const result = await userCollection.insertOne(newUserData);

			return result;
		} catch (error) {
			throw error;
		}
	}

	/**
	 *
	 * @param {string} username - O username do usuário.
	 *
	 * @param {Collection} userCollection
	 * @returns
	 */
	async getUserByUserName(username, userCollection) {
		try {
			const result = await userCollection.findOne({ username: username });

			return result;
		} catch (error) {
			throw error;
		}
	}
}
