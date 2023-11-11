import React, { useEffect, useState } from "react";

const Navigation = ({ onSelectContact }) => {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		// Fetch contacts from backend
		// Example: fetch('/api/contacts').then(response => response.json()).then(data => setContacts(data));
		// Replace the above fetch with your actual API call

		// For testing purposes, I'll provide a sample array
		const sampleContacts = ["User1", "User2", "User3"];
		setContacts(sampleContacts);
	}, []);

	return (
		<div className="sidebar">
			<ul>
				{contacts.map((contact) => (
					<li key={contact} onClick={() => onSelectContact(contact)}>
						{contact}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Navigation;
