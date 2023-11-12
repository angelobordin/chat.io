import mongoose from "mongoose";
import UserModel from "./user-model.js";

const chatSchema = new mongoose.Schema({
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	],
	messages: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "User",
			},
			content: {
				type: String,
				required: true,
			},
			timestamp: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

chatSchema.methods.registerMessage = async function (userId, content) {
	const user = await UserModel.findById(userId);
	if (!user) throw new Error("Usuário não encontrado");

	this.messages.push({
		user: userId,
		content,
		timestamp: Date.now(),
	});

	await this.save();

	const users = await UserModel.find({ _id: { $in: this.users } });

	const userNames = users.map((user) => ({ id: user._id.toString(), name: user.name }));

	return { chat: this, userNames };
};

const ChatModel = mongoose.model("Chat", chatSchema);

export default ChatModel;
