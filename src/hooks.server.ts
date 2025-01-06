import { clearAuthCookie, getAuthCookie } from "$lib/server/authCookie";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const authToken = getAuthCookie(event.cookies);
	const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

	try {
		if (authToken) {
			// Validate token here
			// const userData = await api.validateToken(authToken);
			const userData = null;
			event.locals.user = userData;

			// Redirect from auth routes if logged in
			if (authRoutes.some((route) => event.url.pathname.startsWith(route))) {
				return new Response(null, {
					status: 302,
					headers: { Location: "/dashboard" },
				});
			}
		} else if (!authRoutes.some((route) => event.url.pathname.startsWith(route))) {
			console.log("no token", { authToken });

			return new Response(null, {
				status: 302,
				headers: { Location: "/login" },
			});
		}
	} catch (error) {
		clearAuthCookie(event.cookies);
		event.locals.user = null;
		console.log("no token", { authToken });

		if (!authRoutes.some((route) => event.url.pathname.startsWith(route))) {
			return new Response(null, {
				status: 302,
				headers: { Location: "/login" },
			});
		}
	}

	return resolve(event);
};
