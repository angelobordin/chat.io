import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sidebar.css";

const Navigation = ({ onSelectContact, userData }) => {
	const [contacts, setContacts] = useState([]);
	const [selectedContact, setSelectedContact] = useState(null);

	useEffect(() => {
		const handleContacts = async () => {
			const response = await axios.get("http://localhost:8080/user/list");
			console.log(response.data);
			const contactList = response.data.data;

			for (let index = 0; index < contactList.length; index++) {
				if (contactList[index]._doc._id !== userData.id) {
					setContacts([
						...contacts,
						{
							id: contactList[index]._doc._id,
							nome: contactList[index]._doc.name,
						},
					]);
				}
			}
		};

		handleContacts();
	}, []);

	const handleSelectContact = (contact) => {
		setSelectedContact(contact);
		onSelectContact(contact);
	};

	return (
		<div className="sidebar">
			<ul>
				{contacts.map((contact) => (
					<li key={contact.id} onClick={() => handleSelectContact(contact)} className={selectedContact === contact ? "active" : ""}>
						{contact.nome}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Navigation;
