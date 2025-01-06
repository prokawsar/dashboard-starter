<script lang="ts">
	import '@/app.css';
	import Footer from '@/lib/components/footer.svelte';
	import Header from '@/lib/components/header.svelte';
</script>

<Header />
<main class="flex h-full min-h-[70vh]">
	<div class="flex w-full flex-col items-center justify-center text-4xl font-bold">
		<p class="text-red-500">Error</p>
		<p class="text-red-500">404</p>
	</div>
</main>
<Footer />
