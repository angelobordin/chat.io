import Jwt from "jsonwebtoken";
import AuthenticationError from "../errors/authenticationError.js";
import TokenInvalidError from "../errors/invalidToken.js";

export function socketAuth(socket, next) {
	try {
		const { authorization } = socket.handshake.headers;
		if (!authorization) throw new AuthenticationError("Token ausente!");

		const token = authorization.replace("Bearer ", ""); // Remova 'Bearer ' do início do token, se presente

		const tokenIsValid = Jwt.verify(token, process.env.TOKEN_SECRET);
		if (!tokenIsValid) throw new TokenInvalidError("Token Inválido");

		next();
	} catch (error) {
		next(error);
	}
}
