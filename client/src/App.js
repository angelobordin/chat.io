import React from "react";
import GlobalStyle from "./styles/global";
import RoutesApp from "./routes/router";
import { AuthProvider } from "./contexts/auth";
import { SocketProvider } from "./contexts/socket";
import { ToastContainer } from "react-toastify";

const App = () => {
	return (
		<SocketProvider>
			<AuthProvider>
				<RoutesApp />
				<GlobalStyle />
				<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick />
			</AuthProvider>
		</SocketProvider>
	);
};

export default App;
