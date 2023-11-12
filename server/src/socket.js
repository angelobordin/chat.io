import { Server as SocketIoServer } from "socket.io";
import { MessageService } from "./service/message-service.js";
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
		this.#io.use(socketAuth);
		this.#io.on("connection", (socket) => {
			console.log("[IO] Connection => User has been connected", socket.id);

			socket.on("chat", async (userData) => {
				const chat = await MessageService.getChat(userData);

				socket.join(chat.data._id.toString());

				socket.emit("chat", chat);
			});

			socket.on("chat.message", async (message) => {
				await MessageService.registerMessage(message);

				socket.to(message.room).emit("chat.message", message);
			});

			socket.on("disconnect", () => {
				console.log("[IO] Disconnection => User has been disconnected");
			});
		});
	}
}

export default SocketServer;
