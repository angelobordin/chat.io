import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import UserRoutes from "./routes/user-routes.js";
import "./util/database/mongo-connection.js";

class Server {
	#server;
	#port;

	/**
	 *
	 * @param {number} _port
	 */
	constructor(_port) {
		this.#server = new express();
		this.#port = _port;
		this.initializateMiddleware();
		this.initRouteBase();
		this.initErrorHandling();
	}

	initializateMiddleware() {
		console.log("Initializing Middlewares...");
		this.#server.use(express.json());
		this.#server.use(cors());
		this.#server.use(bodyParser.json());
		// this.#server.use(fileMiddleware);
		// this.#server.use(decodeToken);
		console.log("Complete!");
	}

	initRouteBase() {
		console.log("Initializing routes...");
		this.#server.use(UserRoutes);
		console.log("Complete!");
	}

	initErrorHandling() {
		// this.#server.use(errorHandler);
	}

	listen() {
		this.#server.listen(this.#port, () => console.log(`[HTPP] Server => Server is running at port ${this.#port}`));
	}
}

new Server(8080).listen();
