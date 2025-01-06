import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		// login api call
		let error = null;

		if (error) {
			return fail(400, { error: error.message, email });
		}

		return { success: true, email };
	},
	loginwithpassword: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		let error = null;

		if (error) {
			return fail(400, { error: error.message, email });
		}

		return { success: true, email };
	},
};
