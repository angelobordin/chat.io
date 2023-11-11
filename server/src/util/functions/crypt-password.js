import bcrypt from "bcrypt";
export class Password {
	/**
	 *
	 * @param {string} password
	 * @returns
	 */
	static async generateHashPassword(password) {
		try {
			const saltPassword = bcrypt.genSaltSync(10);
			const hashPassword = bcrypt.hashSync(password, saltPassword);

			return hashPassword;
		} catch (error) {
			throw error;
		}
	}

	/**
	 *
	 * @param {object} user
	 * @param {string} password
	 * @returns
	 */
	static async validPassword(user, password) {
		try {
			const match = bcrypt.compareSync(password, user.password);

			return match;
		} catch (error) {
			throw error;
		}
	}
}
