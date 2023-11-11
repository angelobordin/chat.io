import React, { useState } from "react";

const Chat = ({ selectedContact }) => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");

	const handleSendMessage = () => {
		// Send the newMessage to the backend
		// Example: fetch('/api/sendMessage', { method: 'POST', body: JSON.stringify({ to: selectedContact, message: newMessage }) });
		// Replace the above fetch with your actual API call

		// For testing purposes, let's simulate adding a message to the conversation
		const updatedMessages = [...messages, { sender: "Me", text: newMessage }];
		setMessages(updatedMessages);
		setNewMessage("");
	};

	return (
		<div className="conversation">
			{selectedContact ? (
				<>
					<div className="messages">
						{messages.map((message, index) => (
							<div key={index} className={message.sender === "Me" ? "sent" : "received"}>
								<p>{message.text}</p>
							</div>
						))}
					</div>
					<div className="input-section">
						<input type="text" placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
						<button onClick={handleSendMessage}>Send</button>
					</div>
				</>
			) : (
				<p>Select a contact to start a conversation</p>
			)}
		</div>
	);
};

export default Chat;
