import React, { useState } from "react";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import Button from "../../components/button";
import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";

const Signin = () => {
	let socket = useSocket();
	const { signin } = useAuth();
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [senha, setSenha] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async () => {
		if (!username || !senha) {
			setError("Preencha todos os campos");
			return;
		}

		if (await signin(username, senha)) {
			const user = JSON.parse(localStorage.getItem("user_data"));
			socket.emit("login", user.id);
			navigate("/home");
		}
	};

	return (
		<C.Container>
			<C.Label>Acesse sua conta</C.Label>
			<C.Content>
				<Input type="text" placeholder="Username/E-mail" value={username} onChange={(e) => [setUsername(e.target.value), setError("")]} />
				<Input type="password" placeholder="Password" value={senha} onChange={(e) => [setSenha(e.target.value), setError("")]} />
				<C.labelError>{error}</C.labelError>
				<Button Text="Login" onClick={handleLogin} />
				<C.LabelSignup>
					Não tem uma conta?
					<C.Strong>
						<Link to="/signup">&nbsp;Cadastre-se</Link>
					</C.Strong>
				</C.LabelSignup>
			</C.Content>
		</C.Container>
	);
};

export default Signin;
