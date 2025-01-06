import { dev } from "$app/environment";
import type { Cookies } from "@sveltejs/kit";

const COOKIE_NAME = "auth_token";

export function setAuthCookie(cookies: Cookies, token: string) {
	cookies.set(COOKIE_NAME, token, {
		httpOnly: true,
		secure: !dev,
		sameSite: "strict",
		path: "/",
		maxAge: 60 * 60 * 24 * 7, // 1 week
	});
}

export function getAuthCookie(cookies: Cookies): string | undefined {
	return cookies.get(COOKIE_NAME);
}

export function clearAuthCookie(cookies: Cookies) {
	cookies.delete(COOKIE_NAME, { path: "/" });
}
