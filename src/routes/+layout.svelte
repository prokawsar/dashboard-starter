<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '@/app.css';

	let { data, children } = $props();

</script>

{@render children()}
