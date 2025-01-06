<script lang="ts">
	import { goto } from '$app/navigation';
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import { columns } from '$lib/data/columns.js';
	// import data from '$lib/data/tasks.json';
	import Head from '@/lib/components/head.svelte';

	const { data } = $props();
</script>

<Head title="Orders" />

<div class="flex h-full w-full flex-1 flex-col space-y-8 p-3">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
			<p class="text-muted-foreground">Here's a list of your orders!</p>
		</div>
	</div>
	<DataTable
		data={data.orders}
		{columns}
		onRowClick={(id: string) => goto('/dashboard/orders/' + id)}
	/>
</div>
