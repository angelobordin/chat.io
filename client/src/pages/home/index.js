import React, { useState } from "react";
import Navigation from "../../components/navigation";
import Chat from "../../components/chat";

const Home = () => {
	const user_data = JSON.parse(localStorage.getItem("user_data"));

	const [selectedContact, setSelectedContact] = useState(null);

	const handleContactSelect = (contact) => {
		setSelectedContact(contact);
	};

	return (
		<div>
			<Navigation onSelectContact={handleContactSelect} userData={user_data} />
			<Chat selectedContact={selectedContact} userData={user_data} />
		</div>
	);
};

export default Home;
