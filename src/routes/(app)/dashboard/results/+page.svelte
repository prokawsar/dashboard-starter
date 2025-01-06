<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
	import {
		Pagination,
		PaginationContent,
		PaginationItem,
		PaginationLink,
	} from "$lib/components/ui/pagination";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import Head from "@/lib/components/head.svelte";
	import PaginationNextButton from "@/lib/components/ui/pagination/pagination-next-button.svelte";
	import PaginationPrevButton from "@/lib/components/ui/pagination/pagination-prev-button.svelte";
	import { onMount } from "svelte";

	interface AIImage {
		id: string;
		url: string;
		prompt: string;
		createdAt: string;
	}

	// State management
	let images: AIImage[] = $state([]);
	let loading = $state(true);
	let error: string | null = $state(null);
	let currentPage = 1;
	const imagesPerPage = 8;

	// Fetch images from API
	async function fetchImages() {
		loading = true;
		error = null;
		try {
			images = [];
		} catch (err) {
			error = err instanceof Error ? err.message : "An unknown error occurred";
		} finally {
			loading = false;
		}
	}

	// Pagination logic
	let paginatedImages = $derived(
		images.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage)
	);

	onMount(fetchImages);

	// Refresh images
	function handleRefresh() {
		fetchImages();
	}
	const count = 10;
	const siblingCount = 1;
</script>

<Head title="Generated logos" />

{#if loading}
	<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
		{#each Array(12) as _}
			<Skeleton class="aspect-square w-full" />
		{/each}
	</div>
{:else if error}
	<div class="p-4 text-center text-destructive">
		<p>{error}</p>
		<Button onclick={handleRefresh} class="mt-4">Try Again</Button>
	</div>
{:else}
	<div class="container mx-auto px-4 py-8">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{#each paginatedImages as image (image.id)}
				<Card class="transition-shadow hover:shadow-lg">
					<CardHeader>
						<CardTitle class="truncate text-sm">
							{image.prompt}
						</CardTitle>
					</CardHeader>
					<CardContent class="p-4">
						<img
							src={image.url}
							alt={image.prompt}
							class="aspect-square w-full rounded-md object-cover"
							loading="lazy"
						/>
					</CardContent>
					<CardFooter class="text-xs text-muted-foreground">
						{new Date(image.createdAt).toLocaleDateString()}
					</CardFooter>
				</Card>
			{/each}
		</div>

		<!-- Pagination -->
		<div class="mt-8 flex justify-center">
			<Pagination {count} perPage={imagesPerPage} {siblingCount}>
				{#snippet children({ pages, currentPage })}
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevButton>
								<!-- <ChevronLeft class="size-4" /> -->
								<span class="hidden sm:block">Previous</span>
							</PaginationPrevButton>
						</PaginationItem>
						{#each pages as page (page.key)}
							{#if page.type === "ellipsis"}
								<PaginationItem>
									<!-- <PaginationEllipsis /> -->
								</PaginationItem>
							{:else}
								<PaginationItem>
									<PaginationLink {page} isActive={currentPage === page.value}>
										{page.value}
									</PaginationLink>
								</PaginationItem>
							{/if}
						{/each}
						<PaginationItem>
							<PaginationNextButton>
								<span class="hidden sm:block">Next</span>
								<!-- <ChevronRight class="size-4" /> -->
							</PaginationNextButton>
						</PaginationItem>
					</PaginationContent>
				{/snippet}
			</Pagination>
		</div>
	</div>
{/if}
