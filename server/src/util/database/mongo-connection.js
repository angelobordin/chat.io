import { MongoClient } from "mongodb";
import mongoose from "mongoose";

class Database {
	// #client;
	// #userCollection;
	url = "mongodb://root:root@localhost:27017/chat_database?authSource=admin";

	constructor() {
		// this.#client = new MongoClient(url);
		// this.#userCollection = null;
	}

	async connect() {
		try {
			const connection = await mongoose.connect(this.url);

			console.log(`MongoDB Connected: ${connection.connection.host}`);
			// await this.#client.connect();
			// const db = this.#client.db();
			// this.#userCollection = db.collection("user");
			// console.log("Connection => Database connection established!");
		} catch (error) {
			throw new Error(error);
		}
	}

	// getUserCollection() {
	// 	if (!this.#userCollection) {
	// 		throw new Error("Database connection not established. Call connect() first.");
	// 	}
	// 	return this.#userCollection;
	// }

	// async close() {
	// 	await this.#client.close();
	// 	console.log("Connection => Database connection closed.");
	// }
}

export default Database;
