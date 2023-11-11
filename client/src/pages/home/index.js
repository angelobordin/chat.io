import React, { useState } from "react";
import Navigation from "../../components/navigation";
import Chat from "../../components/chat";

const Home = () => {
	const [selectedContact, setSelectedContact] = useState(null);

	const handleContactSelect = (contact) => {
		setSelectedContact(contact);
	};

	return (
		<div>
			<Navigation onSelectContact={handleContactSelect} />
			<Chat selectedContact={selectedContact} />
		</div>
	);
};

export default Home;
