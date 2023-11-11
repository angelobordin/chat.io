import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import useAuth from "../hooks/useAuth";

const AuthGuard = ({ Item }) => {
	const { signed } = useAuth();
	return signed ? <Item /> : <SignIn />;
};

const RoutesApp = () => {
	return (
		<BrowserRouter>
			<Fragment>
				<Routes>
					<Route exact path="/home" element={<AuthGuard Item={Home} />} />
					<Route path="/" element={<SignIn />} />
					<Route exac path="/signup" element={<SignUp />} />
					<Route path="*" element={<SignIn />} />
				</Routes>
			</Fragment>
		</BrowserRouter>
	);
};

export default RoutesApp;
