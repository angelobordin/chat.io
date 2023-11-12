import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import http from "http";
import UserRoutes from "./routes/user-routes.js";
import Database from "./util/database/mongo-connection.js";
import SocketServer from "./socket.js";
import { errorMiddleware } from "./util/middleware/errorHandler.js";

class HttpServer {
	#server;
	#port;
	#httpServer;
	#dataBase;
	#socketManager;

	/**
	 *
	 * @param {number} _port
	 */
	constructor(_port) {
		this.#server = new express();
		this.#port = _port;
		this.#httpServer = http.createServer(this.#server);
		this.#socketManager = new SocketServer(this.#httpServer);
		this.#dataBase = new Database();

		this.initMiddleware();
		this.initRouteBase();
		this.initErrorHandling();
	}

	async initDatabase() {
		await this.#dataBase.connect();
	}

	initMiddleware() {
		console.log("Initializing Middlewares...");
		this.#server.use(express.json());
		this.#server.use(cors());
		this.#server.use(bodyParser.json());
		console.log("Complete!");
	}

	initRouteBase() {
		console.log("Initializing routes...");
		this.#server.use(UserRoutes);
		console.log("Complete!");
	}

	initErrorHandling() {
		this.#server.use(errorMiddleware);
	}

	async listen() {
		await this.initDatabase();
		this.#httpServer.listen(this.#port, () => console.log(`[HTTP] Server => Server is running at port ${this.#port}`));
	}
}

new HttpServer(8080).listen();
