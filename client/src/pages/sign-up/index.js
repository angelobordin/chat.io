import React, { useState } from "react";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import Button from "../../components/button";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [usernameConf, setUsernameConf] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const { signup } = useAuth();

	const handleSignup = () => {
		if (!username | !usernameConf | !password) {
			setError("Preencha todos os campos");
			return;
		} else if (username !== usernameConf) {
			setError("Os dados de usuário não são iguais");
			return;
		}

		const res = signup(username, password);

		if (res) {
			setError(res);
			return;
		}

		alert("Usuário cadatrado com sucesso!");
		navigate("/");
	};

	return (
		<C.Container>
			<C.Label>Cadastre-se</C.Label>
			<C.Content>
				<Input type="text" placeholder="Digite seu Nome" value={name} onChange={(e) => [setName(e.target.value), setError("")]} />
				<Input type="text" placeholder="Digite seu Username/E-mail" value={username} onChange={(e) => [setUsername(e.target.value), setError("")]} />
				<Input type="text" placeholder="Confirme seu Username/E-mail" value={usernameConf} onChange={(e) => [setUsernameConf(e.target.value), setError("")]} />
				<Input type="password" placeholder="Password" value={password} onChange={(e) => [setPassword(e.target.value), setError("")]} />
				<C.labelError>{error}</C.labelError>
				<Button Text="Inscrever-se" onClick={handleSignup} />
				<C.LabelSignin>
					Já tem uma conta?
					<C.Strong>
						<Link to="/">&nbsp;Acesse sua conta</Link>
					</C.Strong>
				</C.LabelSignin>
			</C.Content>
		</C.Container>
	);
};

export default Signup;
