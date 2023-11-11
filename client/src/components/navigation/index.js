import React, { useEffect, useState } from "react";
import "./sidebar.css";

const Navigation = ({ onSelectContact }) => {
	const [contacts, setContacts] = useState([]);
	const [selectedContact, setSelectedContact] = useState(null);

	useEffect(() => {
		// Fetch contacts from backend
		// Example: fetch('/api/contacts').then(response => response.json()).then(data => setContacts(data));
		// Replace the above fetch with your actual API call

		// For testing purposes, I'll provide a sample array
		const sampleContacts = ["User1", "User2", "User3"];
		setContacts(sampleContacts);
	}, []);

	const handleSelectContact = (contact) => {
		setSelectedContact(contact);
		onSelectContact(contact);
	};

	return (
		<div className="sidebar">
			<ul>
				{contacts.map((contact) => (
					<li key={contact} onClick={() => handleSelectContact(contact)} className={selectedContact === contact ? "active" : ""}>
						{contact}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Navigation;
