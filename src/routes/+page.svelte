<script>
	import { _, locales, locale } from 'svelte-i18n'
</script>

<svelte:head>
	<title>Dashboard starter</title>
</svelte:head>

<div class="flex flex-row gap-2 container mx-auto justify-center">
	<select bind:value={$locale}>
		{#each $locales as locale}
			<option value={locale}>{locale}</option>
		{/each}
	</select>
</div>

<h1
	data-tippy="Hello Tooltip"
	class="text-3xl mt-10 font-bold underline mx-auto container flex justify-center"
>
	{$_('welcome')}
</h1>
