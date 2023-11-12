import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../../util/api/httpClient";
import useSocket from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";
import Button from "../button";
import "./sidebar.css";

const Navigation = ({ onSelectContact, userData }) => {
	let socket = useSocket();
	const { signout } = useAuth();
	const navigate = useNavigate();

	const [contacts, setContacts] = useState([]);
	const [selectedContact, setSelectedContact] = useState(null);

	useEffect(() => {
		socket.on("update status", (data) => {
			const updatedContacts = contacts.map((contact) => (contact._id === data.id ? { ...contact, status: data.status } : contact));

			setContacts(updatedContacts);
		});

		socket.on("new register", (newUser) => {
			setContacts((prevContacts) => [...prevContacts, newUser]);
		});
		return () => {
			socket.off("new register");
		};
	});

	useEffect(() => {
		const handleContacts = async () => {
			const response = await HttpClient.getUserList();
			const contactList = response.data.data;

			const filteredContacts = contactList.filter((contact) => contact._doc._id.toString() !== userData.id.toString()).map((contact) => contact._doc);

			setContacts(filteredContacts);
		};

		handleContacts();
	}, [userData.id]);

	const handleSelectContact = (contact) => {
		setSelectedContact(contact);
		onSelectContact(contact);
	};

	const signOut = async () => {
		if (await signout()) {
			const user = JSON.parse(localStorage.getItem("user_data"));
			socket.emit("logout", user.id);
			navigate("/signin");

			localStorage.removeItem("token");
			localStorage.removeItem("user_data");
		}
	};

	return (
		<div className="sidebar">
			<ul>
				{contacts.map((contact, index) => (
					<li key={index} onClick={() => handleSelectContact(contact)} className={selectedContact === contact ? "active" : ""}>
						<div>{contact.name}</div>
						<div>{contact.status ? <span style={{ color: "green", marginLeft: "0.5rem" }}>Online</span> : <span style={{ color: "red", marginLeft: "0.5rem" }}>Offline</span>}</div>
					</li>
				))}
			</ul>
			<div className="button">
				<Button Text="Desconectar" onClick={signOut} />
			</div>
		</div>
	);
};

export default Navigation;
