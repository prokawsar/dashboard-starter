<script lang="ts">
	import { page } from '$app/stores';
	import PaymentModal from '@/lib/components/modals/PaymentModal.svelte';
</script>

<div class="flex h-full w-full flex-1 flex-col space-y-8 p-3">
	<div class="flex flex-col gap-4">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Order: {$page.params.id}</h2>
		</div>
		<!-- {#if !order.paid} -->
		<div class="mx-auto flex w-full max-w-2xl flex-col">
			<PaymentModal />
		</div>
		<!-- {/if} -->
	</div>
</div>
