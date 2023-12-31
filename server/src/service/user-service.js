import Jwt from "jsonwebtoken";
import { UserRepository } from "../repository/user-repository.js";
import { Password } from "../util/functions/crypt-password.js";
import { createSuccessResponse } from "../util/functions/response.js";
import UserModel from "../model/user-model.js";

export class UserService {
	/**
	 * @param {object} newUserData
	 * @param {string} newUserData.nome - O nome do usuário.
	 * @param {string} newUserData.username - O nome de usuário.
	 * @param {string} newUserData.password - A senha do usuário.
	 * @param {boolean} newUserData.status - Status do usuário.
	 * @returns {object}
	 */
	async registerUser(newUserData) {
		try {
			await this.checkIfUserExists(newUserData.username);

			const hashPassword = await Password.generateHashPassword(newUserData.password);
			newUserData = {
				...newUserData,
				password: hashPassword,
			};

			const repository = new UserRepository();
			const result = await repository.registerUser(newUserData);

			return createSuccessResponse("Usuário cadastrado com sucesso!", result);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * @param {object} loginUserData
	 * @param {string} loginUserData.username - O nome de usuário.
	 * @param {string} loginUserData.password - A senha do usuário.
	 * @returns {object}
	 */
	async loginUser(loginUserData) {
		try {
			const user = await UserService.getUserByUsername(loginUserData.username);

			await this.checkUserCredentials(user, loginUserData.password);

			const token = Jwt.sign(loginUserData, process.env.TOKEN_SECRET, { expiresIn: "30d" });

			await UserModel.findOneAndUpdate({ username: loginUserData.username }, { $set: { status: true } });

			const userData = {
				nome: user.nome,
				username: user.username,
				id: user._id,
			};

			return createSuccessResponse("Usuário logado com sucesso!", {
				userData,
				token,
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * @param {object} userId
	 * @returns {object}
	 */
	async logoutUser(userId) {
		try {
			await UserModel.findOneAndUpdate(userId, { $set: { status: false } });

			return createSuccessResponse("Usuário desconectado com sucesso!", null);
		} catch (error) {
			throw error;
		}
	}

	async getUserList() {
		try {
			const repository = new UserRepository();
			const userList = await repository.getUserList();

			const filteredUserList = userList.map((user) => {
				const { password, ...resto } = user;
				return resto;
			});

			return createSuccessResponse("Lista de contatos carregada!", filteredUserList);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * @private
	 * @param {string} username
	 * @throws {Error} Usuário já cadastrado
	 */
	async checkIfUserExists(username) {
		try {
			const repository = new UserRepository();
			const userExists = await repository.getUserByUserName(username);
			if (userExists) throw new Error(`Usuário já cadastrado!`);
			return;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * @private
	 * @param {string} username
	 * @returns {object}
	 * @throws {Error} Usuário não cadastrado
	 */
	static async getUserByUsername(username) {
		try {
			const repository = new UserRepository();
			const user = await repository.getUserByUserName(username);
			if (!user) throw new Error(`Usuário não cadastrado!`);
			return user;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * @private
	 * @param {object} user
	 * @param {string} password
	 * @throws {Error} Credenciais incorretas
	 */
	async checkUserCredentials(user, password) {
		try {
			if (!(await Password.validPassword(user, password))) throw new Error(`Credenciais incorretas!`);
		} catch (error) {
			throw error;
		}
	}
}
