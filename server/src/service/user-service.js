import { UserRepository } from "../repository/user-repository.js";
import { userCollection } from "../util/database/mongo-connection.js";
import { Password } from "../util/functions/crypt-password.js";

export class UserService {
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
			const repository = new UserRepository();
			const userExists = await repository.getUserByName(newUserData.username, userCollection);
			if (userExists) throw new Error(`Usuário já cadastrado!!`);

			const { hashPassword, saltPassword } = Password.generateHashPassword(newUserData.password);
			newUserData = {
				...newUserData,
				password: hashPassword,
				saltPassword,
			};

			const result = await repository.registerUser(newUserData, userCollection);

			return {
				status: 200,
				message: "Usuário cadastro com sucesso!",
				data: result,
			};
		} catch (error) {
			throw error;
		}
	}
}
