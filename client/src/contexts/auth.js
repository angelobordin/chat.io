import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { createContext, useEffect, useState } from "react";
import { HttpClient } from "../util/api/httpClient.js";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [signed, setSigned] = useState();

	useEffect(() => {
		if (localStorage.getItem("token")) setSigned(true);
	}, []);

	const signin = async (username, password) => {
		const response = await HttpClient.signIn(username, password);

		if (response && !response.data.error) {
			localStorage.setItem("user_data", JSON.stringify(response.data.data.userData));
			localStorage.setItem("token", response.data.data.token);

			toast.success(response.data.message);
			setSigned(true);
			return true;
		} else {
			return false;
		}
	};

	const signup = async (name, username, password) => {
		const response = await HttpClient.signUp(name, username, password);

		if (!response.data.error) {
			toast.success(response.data.message);
			return true;
		} else {
			toast.error(response.data.message);
			return false;
		}
	};

	const signout = async () => {
		const user = JSON.parse(localStorage.getItem("user_data"));
		const response = await HttpClient.signOut(user.id);

		if (!response.data.error) {
			toast.warn(response.data.message);
			setSigned(false);
			return true;
		} else {
			toast.error(response.data.message);
			return false;
		}
	};

	return <AuthContext.Provider value={{ signed, signin, signup, signout }}>{children}</AuthContext.Provider>;
};
