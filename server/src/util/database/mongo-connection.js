import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://root:root@localhost:27017/chat_database?authSource=admin");
let userCollection;

try {
	await client.connect();

	const db = client.db();
	userCollection = db.collection("user");

	console.log("Connection => Database connection established!");
} catch (error) {
	throw new Error(error);
}

export { userCollection };
