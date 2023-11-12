import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { HttpClient } from "../../util/api/httpClient";

const Navigation = ({ onSelectContact, userData }) => {
	const [contacts, setContacts] = useState([]);
	const [selectedContact, setSelectedContact] = useState(null);

	useEffect(() => {
		const handleContacts = async () => {
			const response = await HttpClient.getUserList();
			const contactList = response.data.data;

			const filteredContacts = contactList.filter((contact) => contact._doc._id.toString() !== userData.id.toString()).map((contact) => contact._doc);

			setContacts((prevContacts) => [...prevContacts, ...filteredContacts]);
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
						{contact.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Navigation;
