import React, { useEffect, useState } from "react";
import Navigation from "../../components/navigation";
import Chat from "../../components/chat";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";

const Home = () => {
	let socket = useSocket();
	const { signout } = useAuth();
	const user_data = JSON.parse(localStorage.getItem("user_data"));
	const navigate = useNavigate();

	const [selectedContact, setSelectedContact] = useState(null);

	const handleContactSelect = (contact) => {
		setSelectedContact(contact);
	};

	useEffect(() => {
		const signOut = async () => {
			console.log(user_data.id);
			signout();

			socket.emit("logout", user_data.id);
			navigate("/signin");

			localStorage.removeItem("token");
			localStorage.removeItem("user_data");
		};

		window.addEventListener("beforeunload", signOut);
		return () => {
			window.removeEventListener("beforeunload", signOut);
		};
	}, []);

	return (
		<div>
			<Navigation onSelectContact={handleContactSelect} userData={user_data} />
			<Chat selectedContact={selectedContact} userData={user_data} />
		</div>
	);
};

export default Home;
