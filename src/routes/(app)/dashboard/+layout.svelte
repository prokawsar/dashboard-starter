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
	<Sidebar.Inset class="!h-full w-full">
		<main class="h-full w-full p-4">
			<Sidebar.Trigger />
			{@render children?.()}
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
