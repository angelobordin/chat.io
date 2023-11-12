import ChatModel from "../model/chat-model.js";

export class MessageRepository {
	/**
	 *
	 * @param {object} usersData
	 * @param {string} usersData.sender
	 * @param {string} usersData.receiver
	 */
	async getChat(usersData) {
		try {
			const result = await ChatModel.findOne({
				users: { $all: [usersData.sender, usersData.receiver] },
			});

			return result;
		} catch (error) {
			throw error;
		}
	}

	async createChat(newChat) {
		try {
			const result = await newChat.save();

			return result;
		} catch (error) {
			throw error;
		}
	}

	async registerMessage(user, content, chatId) {
		try {
			const chat = await ChatModel.findById(chatId);
			if (!chat) throw new Error(`Conversa não encontrada`);

			const result = await chat.registerMessage(user, content);

			return result;
		} catch (error) {
			throw error;
		}
	}
}
