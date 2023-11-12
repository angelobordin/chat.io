import mongoose from "mongoose";

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

chatSchema.methods.registerMessage = async function (user, content) {
	this.messages.push({
		user,
		content,
		timestamp: Date.now(),
	});

	await this.save();
};

const ChatModel = mongoose.model("Chat", chatSchema);

export default ChatModel;
