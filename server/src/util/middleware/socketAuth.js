import Jwt from "jsonwebtoken";
import AuthenticationError from "../errors/authenticationError.js";
import TokenInvalidError from "../errors/invalidToken.js";

export function socketAuth(socket, next) {
	try {
		if (!socket.handshake.headers.authorization) throw new AuthenticationError(`Token ausente!`);

		const token = socket.handshake.headers.authorization;

		const tokenIsValid = Jwt.verify(token, process.env.TOKEN_SECRET);
		if (!tokenIsValid) throw new TokenInvalidError(`Token Inválido`);

		next();
	} catch (error) {
		next(error);
	}
}
