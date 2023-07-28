// src/routes/+layout.js
import posthog from 'posthog-js';
import { browser } from '$app/environment';

export const load = async () => {
	//TODO: Need to add posthog project api key
	if (browser) {
		// posthog.init(
		//   '<ph_project_api_key>',
		//   { api_host: 'https://app.posthog.com' }
		// )
	}
	return;
};
