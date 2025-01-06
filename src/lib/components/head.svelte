<script lang="ts">
	type Props = {
		title?: string;
	};
	let { title = 'Starter' }: Props = $props();
</script>

<svelte:head>
	<title>{title} | Starter.io</title>
</svelte:head>
