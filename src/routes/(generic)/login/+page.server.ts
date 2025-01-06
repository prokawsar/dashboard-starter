import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { api } from "@/lib/utils/api";
import { setAuthCookie } from "@/lib/server/authCookie";

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get("email") as string;
		// const password = formData.get("password") as string;
		const response = await api.post("/login", { username: "emilys", password: "emilyspass" });

		if (!response) {
			return fail(400, { error: "error.message", email });
		}

		setAuthCookie(cookies, response.accessToken);

		return { success: true, email };
	},
};
