<script lang="ts">
	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import "@/app.css";
	import { setContext } from "svelte";

	let { children, data } = $props();

	setContext("user", data.user);
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset class="!h-full w-full p-4">
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<div class="flex w-full flex-row items-center justify-end">
				<!-- <Sidebar.Trigger class="" /> -->
				<div class="flex flex-row gap-3 pr-4">
					<h1 class="text-lg">Dashboard</h1>
					<h1 class="text-lg">Account</h1>
				</div>
			</div>
		</header>

		{@render children?.()}
	</Sidebar.Inset>
</Sidebar.Provider>
