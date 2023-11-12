import { createContext, useEffect } from "react";
import io from "socket.io-client";
import { localhostURL } from "../util/api/routes";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const token = localStorage.getItem("token");
	const socket = io(localhostURL, {
		transportOptions: {
			polling: {
				extraHeaders: {
					Authorization: `Bearer ${token}`,
				},
			},
		},
	});

	useEffect(() => {
		socket.on("message notification", (messageData) => {
			const user = JSON.parse(localStorage.getItem("user_data"));
			if (messageData.receiver.id === user.id) {
				const { sender } = messageData;

				toast.success(`${sender.name} te enviou uma mensagem!`);
			}
		});
	});

	useEffect(() => {
		return () => {
			socket.disconnect();
		};
	}, [socket]);

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
