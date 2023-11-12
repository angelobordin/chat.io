import Jwt from "jsonwebtoken";
import AuthenticationError from "../errors/authenticationError.js";
import TokenInvalidError from "../errors/invalidToken.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function authenticationMiddleware(req, res, next) {
	try {
		if (!req.headers["authorization"]) throw new AuthenticationError(`Token ausente!`);

		const token = req.headers["authorization"]?.split("Bearer ")[1];

		const tokenIsValid = Jwt.verify(token, process.env.TOKEN_SECRET);
		if (!tokenIsValid) throw new TokenInvalidError(`Token Inválido`);

		next();
	} catch (error) {
		next(error);
	}
}
