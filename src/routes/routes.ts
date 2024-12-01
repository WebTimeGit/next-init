

export enum RouteType {
	root,
	withId,
	exact,
}

export const ROUTES = {
	home: '/',
	auth : {
		login: '/login',
		registration: '/registration',
	},
	settings : '/settings',
}


export const openRoutes = [
	{ path: ROUTES.home, type: RouteType.exact },
	{ path: ROUTES.auth.login, type: RouteType.exact },
	{ path: ROUTES.auth.registration, type: RouteType.exact },
	{ path: ROUTES.settings, type: RouteType.exact },
];