import JsonWebTokenError from "jsonwebtoken";
import AuthenticationError from "../errors/authenticationError.js";
import TokenInvalidError from "../errors/invalidToken.js";

/**
 *
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function errorMiddleware(err, req, res, next) {
	try {
		if (err instanceof AuthenticationError) {
			res.status(401).json({
				status: 401,
				message: "Erro de autenticação!",
				error: true,
				data: null,
			});
		} else if (err instanceof TokenInvalidError) {
			res.status(401).json({
				status: 401,
				message: "Token inválido!",
				error: true,
				data: null,
			});
		} else if (err instanceof Error) {
			res.send({
				status: 400,
				message: err.message,
				error: true,
				data: null,
			});
		} else if (err instanceof JsonWebTokenError) {
			res.send({
				status: 400,
				message: err.message,
				error: true,
				data: null,
			});
		} else {
			res.status(500).json({
				status: 500,
				message: "Erro interno no servidor!",
				error: true,
				data: null,
			});
		}
	} catch (error) {
		next(error);
	}
}
