import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./chat.css";

const Chat = ({ selectedContact }) => {
	const socket = io("http://localhost:8080");
	socket.on("connect", () => console.log(`[IO] Connect => New connection established`));

	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");

	useEffect(() => {
		const handlerNewMessage = (newMessage) => setMessages([...messages, newMessage]);

		socket.on("chat.message", handlerNewMessage);
		return () => socket.off("chat.message", handlerNewMessage);
	}, [messages]);

	const handlerSendMessage = () => {
		if (newMessage.trim()) {
			socket.emit("chat.message", { sender: "Me", text: newMessage });
			setNewMessage("");
		}
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
					<div className="form">
						<input
							type="text"
							placeholder="Type a message..."
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handlerSendMessage()}
						/>
						<button onClick={handlerSendMessage} type="button">
							Send
						</button>
					</div>
				</>
			) : (
				<div className="layout-message">
					<p className="message">Select a contact to start a conversation</p>
				</div>
			)}
		</div>
	);
};

export default Chat;
