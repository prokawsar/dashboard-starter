<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as InputOTP from '$lib/components/ui/input-otp';
	import { Label } from '$lib/components/ui/label';
	import { Loader2 } from 'lucide-svelte';

	interface Props {
		form?: { email?: string; error?: string };
	}

	let { form = {} }: Props = $props();

	let loading = $state(false);
	let email = $state(form.email || '');
	let otpSent = $state(false);
	// let otpSent = $page.url.searchParams.get('sent-otp') == 'true' || false;

	let error: string | null = $state(null);

	function handleSubmit() {
		loading = true;
		return async ({ result, update }) => {
			console.log(result);
			if (result.type === 'failure') {
				error = result.data?.error;
				email = result.data?.email || email;
			} else if (result.type === 'success') {
				if (!otpSent) {
					otpSent = true;
					error = null;
				} else {
					// OTP verified successfully, redirect handled by server
				}
			}
			await update({ reset: false });
			loading = false;
		};
	}
</script>

<form
	method="POST"
	action={otpSent ? '?/verifyOTP' : '?/login'}
	use:enhance={handleSubmit}
	class="space-y-4"
>
	<input type="hidden" name="email" value={email} />
	<div class="space-y-2">
		<Label for="email">Email</Label>
		<Input
			id="email"
			name="email"
			type="email"
			placeholder="name@example.com"
			required
			bind:value={email}
			disabled={otpSent || loading}
		/>
	</div>

	{#if otpSent}
		<div class="space-y-2">
			<Label for="otp">OTP</Label>
			<InputOTP.Root maxlength={6} name="otp" class="justify-center">
				{#snippet children({ cells })}
					<InputOTP.Group>
						{#each cells.slice(0, 3) as cell}
							<InputOTP.Slot {cell} />
						{/each}
					</InputOTP.Group>
					<InputOTP.Separator />
					<InputOTP.Group>
						{#each cells.slice(3, 6) as cell}
							<InputOTP.Slot {cell} />
						{/each}
					</InputOTP.Group>
				{/snippet}
			</InputOTP.Root>
		</div>
	{/if}

	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}

	<Button type="submit" class="w-full" disabled={loading}>
		{#if loading}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
		{/if}
		{otpSent ? 'Verify OTP' : 'Send OTP'}
	</Button>
</form>
