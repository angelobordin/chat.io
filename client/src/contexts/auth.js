import { createContext, useEffect, useState } from "react";
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
			// TOASTR
			setSigned(true);
			return true;
		} else {
			// TOASTR
			return false;
		}
	};

	const signup = (email, password) => {
		const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

		const hasUser = usersStorage?.filter((user) => user.email === email);

		if (hasUser?.length) {
			return "Já tem uma conta com esse E-mail";
		}

		let newUser;

		if (usersStorage) {
			newUser = [...usersStorage, { email, password }];
		} else {
			newUser = [{ email, password }];
		}

		localStorage.setItem("users_bd", JSON.stringify(newUser));

		return;
	};

	const signout = () => {
		setUser(null);
		localStorage.removeItem("user_token");
	};

	return <AuthContext.Provider value={{ user, signed, signin, signup, signout }}>{children}</AuthContext.Provider>;
};
