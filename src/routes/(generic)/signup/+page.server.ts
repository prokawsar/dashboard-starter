import { fail, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
	signup: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		let error = null;

		if (error) {
			return fail(400, { error: error.message, email });
		}

		return { success: true, email };
	},
};
