<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import {
		Pagination,
		PaginationContent,
		PaginationItem,
		PaginationLink
	} from '$lib/components/ui/pagination';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import PaginationPrevButton from '@/lib/components/ui/pagination/pagination-prev-button.svelte';
	import PaginationNextButton from '@/lib/components/ui/pagination/pagination-next-button.svelte';
	import Head from '@/lib/components/head.svelte';

	interface AIImage {
		id: string;
		url: string;
		prompt: string;
		createdAt: string;
	}

	const fakeImages: AIImage[] = [
		{
			id: '1',
			url: 'https://images.unsplash.com/photo-1682685797406-97f364419b24?q=80&w=800&auto=format&fit=crop&ixid=M3wxMjA3fDF8MXxhbGx8fHx8fHx8fHwxNzAxNjM5MjQwfA',
			prompt: 'Futuristic cityscape with neon lights',
			createdAt: new Date('2023-12-03').toISOString()
		},
		{
			id: '2',
			url: 'https://images.unsplash.com/photo-1700610243770-61f29bec1626?q=80&w=800&auto=format&fit=crop&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAxNjM5MjQwfA',
			prompt: 'Serene mountain landscape at dawn',
			createdAt: new Date('2023-12-02').toISOString()
		},
		{
			id: '3',
			url: 'https://images.unsplash.com/photo-1700747370814-e6acb4bd806b?q=80&w=800&auto=format&fit=crop&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAxNjM5MjQwfA',
			prompt: 'Abstract geometric patterns in blue and orange',
			createdAt: new Date('2023-12-01').toISOString()
		},
		{
			id: '4',
			url: 'https://images.unsplash.com/photo-1700695374955-de5dcfdef24d?q=80&w=800&auto=format&fit=crop&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAxNjM5MjQwfA',
			prompt: 'Vibrant underwater coral reef ecosystem',
			createdAt: new Date('2023-11-30').toISOString()
		},
		{
			id: '5',
			url: 'https://images.unsplash.com/photo-1700596640295-23ea33af1d5e?q=80&w=800&auto=format&fit=crop&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAxNjM5MjQwfA',
			prompt: 'Minimalist space exploration illustration',
			createdAt: new Date('2023-11-29').toISOString()
		},
		{
			id: '6',
			url: 'https://images.unsplash.com/photo-1700557092342-5d6c81a46455?q=80&w=800&auto=format&fit=crop&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAxNjM5MjQwfA',
			prompt: 'Surreal desert landscape with floating rocks',
			createdAt: new Date('2023-11-28').toISOString()
		},
		{
			id: '7',
			url: 'https://images.unsplash.com/photo-1700523293400-4d7ce11da55d?q=80&w=800&auto=format&fit=crop&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAxNjM5MjQwfA',
			prompt: 'Cyberpunk street scene with holographic displays',
			createdAt: new Date('2023-11-27').toISOString()
		},
		{
			id: '8',
			url: 'https://images.unsplash.com/photo-1700433455915-d611c9a46e85?q=80&w=800&auto=format&fit=crop&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAxNjM5MjQwfA',
			prompt: 'Dreamlike forest with bioluminescent elements',
			createdAt: new Date('2023-11-26').toISOString()
		},
		{
			id: '9',
			url: 'https://images.unsplash.com/photo-1700400617719-7aeaa0eddca4?q=80&w=800&auto=format&fit=crop&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAxNjM5MjQwfA',
			prompt: 'Retro-futuristic robot design',
			createdAt: new Date('2023-11-25').toISOString()
		},
		{
			id: '10',
			url: 'https://images.unsplash.com/photo-1700298085960-e4f1a0d3d6a9?q=80&w=800&auto=format&fit=crop&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAxNjM5MjQwfA',
			prompt: 'Ethereal aurora borealis over arctic landscape',
			createdAt: new Date('2023-11-24').toISOString()
		},
		{
			id: '11',
			url: 'https://images.unsplash.com/photo-1700220246246-395bca3c6e59?q=80&w=800&auto=format&fit=crop&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAxNjM5MjQwfA',
			prompt: 'Magical floating island ecosystem',
			createdAt: new Date('2023-11-23').toISOString()
		},
		{
			id: '12',
			url: 'https://images.unsplash.com/photo-1700203256829-52e875ee8e26?q=80&w=800&auto=format&fit=crop&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAxNjM5MjQwfA',
			prompt: 'Quantum computing abstract visualization',
			createdAt: new Date('2023-11-22').toISOString()
		}
	];

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
			images = fakeImages;
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
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
							{#if page.type === 'ellipsis'}
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
