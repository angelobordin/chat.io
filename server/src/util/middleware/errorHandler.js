import AuthenticationError from "../errors/authenticationError.js";
import TokenInvalidError from "../errors/invalidToken.js";

/**
 *
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function errorMiddleware(err, req, res, next) {
	try {
		if (err instanceof AuthenticationError) {
			res.status(401).json({
				type: "Erro de autenticação",
				title: err.message,
				status: 401,
				detail: "Usuário não possui permissão necessária para executar esta ação!",
			});
		} else if (err instanceof TokenInvalidError) {
			res.status(401).json({
				type: "Erro no Token enviado",
				title: err.message,
				status: 401,
				detail: "Token inválido",
			});
		} else if (err instanceof Error) {
			res.send({
				status: 400,
				message: err.message,
				error: true,
				data: null,
			});
		} else {
			res.status(500).json({
				type: "Server Error",
				title: "Erro interno no servidor!",
				status: 500,
				detail: "Erro interno no servidor!",
				instance: "Erro desconhecido no servidor",
			});
		}
	} catch (error) {
		next(error);
	}
}
