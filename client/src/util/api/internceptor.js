import axios from "axios";
import { toast } from "react-toastify";

export const AxionsInstance = axios.create();

AxionsInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}

		config.headers["Content-Type"] = "application/json";
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

AxionsInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.data.message) {
			toast.error(error.response.data.message);
		} else {
			toast.error("Erro de conexão. Tente novamente.");
		}
	}
);
