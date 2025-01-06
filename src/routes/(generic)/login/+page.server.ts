import { setAuthCookie } from "@/lib/server/authCookie";
import { api } from "@/lib/utils/api";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		if (!email || !password) {
			return fail(400, { error: "Email and password are required" });
		}

		try {
			const { accessToken, user } = await api.post("/login", {
				username: "emilys",
				password: "emilyspass",
			});

			setAuthCookie(cookies, accessToken);
			// throw redirect(302, "/dashboard");
			return { success: true, redirect: "/dashboard" };
		} catch (error) {
			// return fail(400, { error: 'Invalid credentials' });
			return fail(400, { error: "error.message", email });
		}
	},
};
