import { Server as SocketIoServer } from "socket.io";

class SocketServer {
	#io;

	constructor(httpServer) {
		this.#io = new SocketIoServer(httpServer, {
			pingTimeout: 60000,
			cors: {
				origin: "*", // Permite de qualquer origem
				methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Permite qualquer método
			},
		});

		this.initSocketIO();
	}

	initSocketIO() {
		this.#io.on("connection", (socket) => {
			console.log("[IO] Connection => User has been connected", socket.id);

			// socket.on("setup", (user) => console.log(user));

			socket.on("chat", (userData) => {});

			socket.on("chat.message", (message) => {
				// Regra de negócio para cadastrar e tratar mensagem;

				socket.emit("chat.message", message);
			});

			socket.on("disconnect", () => {
				console.log("[IO] Disconnection => User has been disconnected");
			});
		});
	}
}

export default SocketServer;
