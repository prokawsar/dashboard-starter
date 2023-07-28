<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import posthog from 'posthog-js';

	$: $page.url.pathname, browser && posthog.capture('$pageview', { layout: true });
</script>

<slot />
