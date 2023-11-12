import { AxionsInstance } from "../api/internceptor.js";
import { ROUTE_USER_LIST, ROUTE_USER_SIGNIN, ROUTE_USER_SIGNUP } from "./routes.js";

export class HttpClient {
	static async signIn(username, password) {
		try {
			return await AxionsInstance.post(ROUTE_USER_SIGNIN(), { username, password });
		} catch (error) {
			console.log(error);
		}
	}

	static async signUp(name, username, password) {
		try {
			return await AxionsInstance.post(ROUTE_USER_SIGNUP(), { name, username, password, status: true });
		} catch (error) {
			throw error;
		}
	}

	static async getUserList() {
		try {
			return await AxionsInstance.get(ROUTE_USER_LIST());
		} catch (error) {
			throw error;
		}
	}
}
