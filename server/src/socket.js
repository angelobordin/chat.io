import { Server as SocketIoServer } from "socket.io";
import { MessageService } from "./service/message-service.js";
import { UserService } from "./service/user-service.js";
import { socketAuth } from "./util/middleware/socketAuth.js";

class SocketServer {
	#io;

	constructor(httpServer) {
		this.#io = new SocketIoServer(httpServer, {
			pingTimeout: 60000,
			cors: {
				origin: "*", // Permite de qualquer origem
			},
		});

		this.initSocketIO();
	}

	initSocketIO() {
		// this.#io.use(socketAuth);
		this.#io.on("connection", (socket) => {
			console.log("[IO] Connection => User has been connected", socket.id);

			socket.on("chat", async (userData) => {
				const chat = await MessageService.getChat(userData);

				socket.join(chat.data._id.toString());

				socket.emit("chat", chat);
			});

			socket.on("chat.message", async (message) => {
				const chatData = await MessageService.registerMessage(message);
				const users = chatData.data.userNames;

				socket.to(message.room).emit("chat.message", message);

				this.#io.emit("message notification", {
					sender: users.filter((user) => user.id === message.user)[0],
					receiver: users.filter((user) => user.id !== message.user)[0],
				});
			});

			socket.on("login", (userId) => {
				this.#io.emit("update status", { id: userId, status: true });
			});

			socket.on("register", async (userUsername) => {
				const { name: nome, username, _id, status } = await UserService.getUserByUsername(userUsername);

				this.#io.emit("new register", { name: nome, username, _id, status });
			});

			socket.on("logout", (userId) => {
				console.log("chegou no socket", userId);
				this.#io.emit("update status", { id: userId, status: false });
			});

			socket.on("disconnect", () => {
				console.log("[IO] Disconnection => User has been disconnected");
			});
		});

		this.#io.on("error", (error) => {
			console.error("Erro no Socket.io:", error.message);
			// Implemente lógica adicional de tratamento de erros, se necessário
		});
	}
}

export default SocketServer;
