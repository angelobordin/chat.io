import { MongoClient } from "mongodb";

class Database {
	#client;
	#userCollection;

	constructor() {
		const url = "mongodb://root:root@localhost:27017/chat_database?authSource=admin";
		this.#client = new MongoClient(url);
		this.#userCollection = null;
	}

	async connect() {
		try {
			await this.#client.connect();
			const db = this.#client.db();
			this.#userCollection = db.collection("user");
			console.log("Connection => Database connection established!");
		} catch (error) {
			throw new Error(error);
		}
	}

	getUserCollection() {
		if (!this.#userCollection) {
			throw new Error("Database connection not established. Call connect() first.");
		}
		return this.#userCollection;
	}

	async close() {
		await this.#client.close();
		console.log("Connection => Database connection closed.");
	}
}

export default Database;
