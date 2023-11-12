export const localhostURL = "http://localhost:8080";

export const ROUTE_USER_SIGNIN = () => {
	return localhostURL.concat(`/user/signin`);
};

export const ROUTE_USER_SIGNUP = () => {
	return localhostURL.concat(`/user/signup`);
};

export const ROUTE_USER_LIST = () => {
	return localhostURL.concat(`/user/list`);
};
