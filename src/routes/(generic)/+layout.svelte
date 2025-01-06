<script lang="ts">
	import '@/app.css';
	import Footer from '@/lib/components/footer.svelte';
	import Header from '@/lib/components/header.svelte';

	let { children } = $props();
</script>

<Header />
<main class="flex h-full min-h-[70vh]">
	{@render children?.()}
</main>
<Footer />
