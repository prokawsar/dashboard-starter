import { clearAuthCookie } from "@/lib/server/authCookie.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
	logout: async ({ cookies }) => {
		clearAuthCookie(cookies);
		throw redirect(302, "/");
	},
};

// no one should visit this page
export async function load() {
	redirect(303, "/");
}
