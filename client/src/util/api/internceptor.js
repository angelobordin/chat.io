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
		if (error.response) {
			const erro = error.response.data;

			if (erro.status === 401) {
				window.location.href = "/signin";
				return Promise.reject(error);
			}

			if (erro.status === 400) {
				toast.error(erro.message);

				return Promise.reject(error);
			}

			toast.error(erro.title);
		} else {
			toast.error("Erro de conexão. Tente novamente.");
		}

		return Promise.reject(error);
	}
);
