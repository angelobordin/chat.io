import React, { useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
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
		socket.on("message notification", (messageData) => {
			const user = JSON.parse(localStorage.getItem("user_data"));
			if (messageData.receiver.id === user.id && room !== messageData.room) {
				const { sender } = messageData;

				toast.success(`${sender.name} te enviou uma mensagem!`);
			}
		});

		return () => {
			socket.off("message notification");
		};
	});

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
