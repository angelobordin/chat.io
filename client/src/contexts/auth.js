import "react-toastify/dist/ReactToastify.css";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [signed, setSigned] = useState(false);

	useEffect(() => {
		const userToken = localStorage.getItem("user_token");
		const usersStorage = localStorage.getItem("users_db");

		if (userToken ** usersStorage) {
			const hasUser = JSON.parse(usersStorage)?.filter((user) => user.email === JSON.parse(userToken).email);

			if (hasUser) setUser(hasUser[0]);
		}
	}, []);

	const signin = async (username, password) => {
		const response = await axios.post("http://localhost:8080/user/signin", { username, password });

		if (!response.data.error) {
			localStorage.setItem("user_data", JSON.stringify(response.data.data.userData));
			localStorage.setItem("token", JSON.stringify(response.data.data.token));

			toast.success(response.data.message);
			setSigned(true);
			return true;
		} else {
			toast.error(response.data.message);
			return false;
		}
	};

	const signup = async (nome, username, password) => {
		const response = await axios.post("http://localhost:8080/user/signup", { nome, username, password });
		console.log(response);

		if (!response.data.error) {
			toast.success(response.data.message);
			return true;
		} else {
			toast.error(response.data.message);
			return false;
		}
	};

	const signout = () => {
		setUser(null);
		localStorage.removeItem("user_token");
	};

	return <AuthContext.Provider value={{ user, signed, signin, signup, signout }}>{children}</AuthContext.Provider>;
};
