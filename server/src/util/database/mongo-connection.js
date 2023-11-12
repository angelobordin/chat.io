import mongoose from "mongoose";
import UserModel from "../../model/user-model.js";

class Database {
	url = "mongodb://root:root@localhost:27017/chat_database?authSource=admin";

	async connect() {
		try {
			const connection = await mongoose.connect(this.url);

			connection.connection.on("error", (err) => {
				console.error("Erro na conexão MongoDB:", err);
			});

			connection.connection.on("close", () => {
				console.log("Conexão MongoDB fechada");
			});

			connection.connection.on("disconnected", () => {
				console.log("Desconectado do MongoDB");
			});

			process.on("SIGINT", async () => {
				await mongoose.connection.close();
				process.exit(0);
			});

			console.log(`MongoDB Connected: ${connection.connection.host}`);

			// Inicializa o usuário admin após a abertura da conexão
			await this.initializeAdminUser();
		} catch (error) {
			throw new Error("Erro na conexão MongoDB");
		}
	}

	async initializeAdminUser() {
		try {
			const userExists = await UserModel.findOne({ isAdmin: true });
			if (userExists) return;

			const novoAdmin = new UserModel({
				name: "Usuário Admin",
				username: "admin",
				password: "admin",
				status: false,
				isAdmin: true,
			});

			await novoAdmin.save();
			return;
		} catch (error) {
			console.error("Erro ao inicializar usuário admin:", error);
			throw new Error(error);
		}
	}
}

export default Database;
