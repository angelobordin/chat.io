import "react-toastify/dist/ReactToastify.css";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [signed, setSigned] = useState();

	useEffect(() => {
		if (localStorage.getItem("token")) setSigned(true);
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

	const signup = async (name, username, password) => {
		const response = await axios.post("http://localhost:8080/user/signup", { name, username, password, status: true });

		if (!response.data.error) {
			toast.success(response.data.message);
			return true;
		} else {
			toast.error(response.data.message);
			return false;
		}
	};

	const signout = () => {
		setSigned(false);
		localStorage.removeItem("user_token");
	};

	return <AuthContext.Provider value={{ signed, signin, signup, signout }}>{children}</AuthContext.Provider>;
};
