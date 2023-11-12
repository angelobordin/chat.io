import mongoose from "mongoose";

class Database {
	url = "mongodb://root:root@localhost:27017/chat_database?authSource=admin";

	async connect() {
		try {
			const connection = await mongoose.connect(this.url);

			console.log(`MongoDB Connected: ${connection.connection.host}`);
		} catch (error) {
			throw new Error(error);
		}
	}
}

export default Database;
