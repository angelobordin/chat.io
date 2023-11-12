/**
 * @private
 * @param {string} message
 * @param {object} data
 * @returns {object}
 */
export function createSuccessResponse(message, data) {
	return {
		status: 200,
		message,
		data,
	};
}

/**
 * @private
 * @param {string} messageError
 * @returns {object}
 */
export function createErrorResponse(messageError) {
	return {
		status: 400,
		message: messageError,
		error: true,
		data: null,
	};
}
