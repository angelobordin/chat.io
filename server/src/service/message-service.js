import ChatModel from "../model/chat-model.js";
import { MessageRepository } from "../repository/message-repository.js";
import { createSuccessResponse } from "../util/functions/response.js";

export class MessageService {
	/**
	 *
	 * @param {object} usersData
	 * @param {string} usersData.sender
	 * @param {string} usersData.receiver
	 */
	static async getChat(usersData) {
		try {
			const repository = new MessageRepository();
			let chat = await repository.getChat(usersData);

			if (!chat) {
				const newChat = new ChatModel({
					users: [usersData.sender, usersData.receiver],
					messages: [],
				});

				await repository.createChat(newChat);

				chat = await repository.getChat(usersData);

				return createSuccessResponse("Conversa cadastrada com sucesso!", chat);
			}

			return createSuccessResponse("Conversa carregada com sucesso!", chat);
		} catch (error) {
			throw error;
		}
	}

	static async registerMessage({ user, content, room }) {
		try {
			const repository = new MessageRepository();
			const message = await repository.registerMessage(user, content, room);

			return createSuccessResponse("Mensagem enviada com sucesso!", message);
		} catch (error) {
			throw error;
		}
	}
}
