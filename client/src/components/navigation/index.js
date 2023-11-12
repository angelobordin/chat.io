import React, { useEffect, useState } from "react";
import { HttpClient } from "../../util/api/httpClient";
import useSocket from "../../hooks/useSocket";
import "./sidebar.css";

const Navigation = ({ onSelectContact, userData }) => {
	let socket = useSocket();

	const [contacts, setContacts] = useState([]);
	const [selectedContact, setSelectedContact] = useState(null);

	useEffect(() => {
		socket.on("update status", (userId) => {
			const updatedContacts = contacts.map((contact) => (contact._id === userId ? { ...contact, status: true } : contact));

			setContacts(updatedContacts);
		});

		socket.on("new register", (newUser) => {
			setContacts((prevContacts) => [...prevContacts, newUser]);
		});
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
		</div>
	);
};

export default Navigation;
