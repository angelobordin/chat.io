import Database from "../util/database/mongo-connection.js";

export class UserRepository {
	#database;

	constructor() {
		this.#database = new Database();
	}

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
			await this.#database.connect();
			const userCollection = this.#database.getUserCollection();

			const result = await userCollection.insertOne(newUserData);

			return result;
		} catch (error) {
			throw error;
		} finally {
			await this.#database.close();
		}
	}

	/**
	 *
	 * @param {string} username - O username do usuário.
	 * @returns
	 */
	async getUserByUserName(username) {
		try {
			await this.#database.connect();
			const userCollection = this.#database.getUserCollection();

			const result = await userCollection.findOne({ username: username });

			return result;
		} catch (error) {
			throw error;
		} finally {
			await this.#database.close();
		}
	}

	async getUserList() {
		try {
			await this.#database.connect();
			const userCollection = this.#database.getUserCollection();

			const result = await userCollection.find().toArray();

			return result;
		} catch (error) {
			throw error;
		} finally {
			await this.#database.close();
		}
	}
}
