import { createContext, useEffect } from "react";
import io from "socket.io-client";
import { localhostURL } from "../util/api/routes";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const socket = io(localhostURL);

	useEffect(() => {
		return () => {
			socket.disconnect();
		};
	}, [socket]);

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
