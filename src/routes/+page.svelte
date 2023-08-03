<script>
	import { i, languages, switchLanguage } from '@inlang/sdk-js';
</script>

<svelte:head>
	<title>Dashboard starter</title>
</svelte:head>

<div class="flex flex-row gap-2 container mx-auto justify-center">
	{#each languages as lang}
		<button on:click={() => switchLanguage(lang)}>{lang}</button>
	{/each}
</div>

<h1
	data-tippy="Hello Tooltip"
	class="text-3xl mt-10 font-bold underline mx-auto container flex justify-center"
>
	{i('welcome')}
</h1>
