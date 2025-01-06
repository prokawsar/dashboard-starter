import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {

	return {
		orders: [],
		user: locals.user
	};
};
