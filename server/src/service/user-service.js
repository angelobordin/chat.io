import Jwt from "jsonwebtoken";
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
			const userExists = await repository.getUserByUserName(newUserData.username, userCollection);
			if (userExists) throw new Error(`Usuário já cadastrado!!`);

			const hashPassword = await Password.generateHashPassword(newUserData.password);
			newUserData = {
				...newUserData,
				password: hashPassword,
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

	/**
	 *
	 * @param {object} loginUserData
	 * @param {string} loginUserData.username - O nome de usuário.
	 * @param {string} loginUserData.password - A senha do usuário.
	 * @returns
	 */
	async loginUser(loginUserData) {
		try {
			const repository = new UserRepository();
			const user = await repository.getUserByUserName(loginUserData.username, userCollection);
			if (!user) throw new Error(`Usuário não cadastrado!`);

			if (!(await Password.validPassword(user, loginUserData.password))) throw new Error(`Credenciais incorretas!`);

			const token = Jwt.sign(loginUserData, process.env.PASSOWOR_SECRET, { expiresIn: "1h" });

			return {
				status: 200,
				message: "Usuário logado com sucesso!",
				data: {
					userData: {
						nome: user.nome,
						username: user.username,
						id: user._id,
					},
					token,
				},
			};
		} catch (error) {
			throw error;
		}
	}
}
