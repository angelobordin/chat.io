import React, { useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import "./chat.css";

const Chat = ({ selectedContact, userData }) => {
	let socket = useSocket();

	const [room, setRoom] = useState("");
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");

	const addNewMessage = (newMessage) => {
		setMessages((prevMessages) => [...prevMessages, newMessage]);
	};

	useEffect(() => {
		if (selectedContact) socket.emit("chat", { sender: userData.id, receiver: selectedContact._id });

		socket.on("chat", (chat) => {
			setRoom(chat.data._id);
			setMessages(chat.data.messages);
		});
		return () => socket.off("chat");
	}, [selectedContact]);

	useEffect(() => {
		socket.on("chat.message", (newMessage) => {
			addNewMessage(newMessage);
		});
		return () => socket.off("chat.message");
	}, []);

	const handlerSendMessage = () => {
		if (newMessage.trim()) {
			socket.emit("chat.message", { user: userData.id, content: newMessage, room });
			addNewMessage({ user: userData.id, content: newMessage, room });
			setNewMessage("");
		}
	};

	return (
		<div className="conversation">
			{selectedContact ? (
				<>
					<div className="messages">
						{messages.map((message, index) => (
							<div key={index} className={message.user === userData.id ? "sent" : "received"}>
								<p>{message.content}</p>
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
