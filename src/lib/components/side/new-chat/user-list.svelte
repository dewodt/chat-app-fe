<script lang="ts">
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import {
		findUserService,
		type FindUserError,
		type FindUserSuccessResponseBody
	} from '$lib/services/users/find-user';
	import { cn } from '$lib/utils/ui';
	import {
		createInfiniteQuery,
		createMutation,
		type InfiniteData,
		type QueryKey
	} from '@tanstack/svelte-query';
	import AvatarUser from '../../shared/avatar-user.svelte';
	import { Search } from 'lucide-svelte';
	import LoadingFill from '$lib/components/shared/loading-fill.svelte';
	import ErrorFill from '$lib/components/shared/error-fill.svelte';
	import IntersectionObserver from 'svelte-intersection-observer';
	import WarningFill from '$lib/components/shared/warning-fill.svelte';
	import {
		newChatService,
		type NewChatError,
		type NewChatSuccessResponseBody
	} from '$lib/services/chats/new-chat';
	import { ToastResponseFactory } from '$lib/components/ui/sonner';
	import { openChat } from '$lib/stores';

	export let debouncedSearch: string;
	export let isPopupOpen: boolean;

	// Intersection observer
	let element: HTMLElement;
	let root: HTMLElement;
	let isIntersecting = false;

	// Find users
	const limit = 6;

	$: query = createInfiniteQuery<
		FindUserSuccessResponseBody,
		FindUserError,
		InfiniteData<FindUserSuccessResponseBody>,
		QueryKey,
		string | undefined
	>({
		queryKey: ['find-users', debouncedSearch],
		retry: 1,
		enabled: !!debouncedSearch,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => {
			if (lastPage.meta.nextCursor) {
				return lastPage.meta.nextCursor;
			} else {
				return undefined;
			}
		},
		queryFn: async ({ pageParam }) => {
			// await new Promise((resolve) => setTimeout(resolve, 3000));
			// throw new Error('An error occurred while fetching users');
			const responseBody = findUserService({
				username: debouncedSearch,
				cursor: pageParam,
				limit
			});
			return responseBody;
		}
	});

	$: allUsers = $query.data?.pages.flatMap((page) => page.data) ?? [];

	$: {
		if (isIntersecting && !$query.isFetchingNextPage && $query.hasNextPage) {
			// console.log('fetching');
			$query.fetchNextPage();
		}
	}

	// Mutation (create or get existing chat)
	const mutation = createMutation<NewChatSuccessResponseBody, NewChatError, string>({
		mutationFn: async (userId: string) => {
			// await new Promise((resolve) => setTimeout(resolve, 3000));
			// throw new Error('An error occurred while creating chat');

			const responseBody = await newChatService(userId);
			return responseBody;
		},
		onMutate: () => {
			// Loading toast
			ToastResponseFactory.createLoading('Please wait while we create a new chat.');
		},
		onSuccess: (response) => {
			// Success toast
			ToastResponseFactory.createSuccess(response.message);

			const newChat = response.data;
			openChat(newChat);

			isPopupOpen = false;
		},
		onError: (error) => {
			// Error toast
			ToastResponseFactory.createError(error);
		}
	});
</script>

{#if !debouncedSearch}
	<div
		class="flex h-80 flex-col items-center justify-center gap-1 pb-7 text-center text-muted-foreground"
	>
		<Search class="size-6" />
		<p>Search for a user to start a conversation</p>
	</div>
{:else}
	{#if $query.isPending}
		<LoadingFill class="h-80" />
	{/if}

	{#if $query.isError}
		<ErrorFill
			class="h-80"
			statusText={$query.error.response?.statusText}
			message={$query.error.response?.data.message}
			refetch={$query.refetch}
		/>
	{/if}

	{#if $query.isSuccess}
		{#if allUsers.length === 0}
			<WarningFill class="h-80" message="No users found" />
		{:else}
			<IntersectionObserver {root} {element} threshold={1} bind:intersecting={isIntersecting}>
				<div bind:this={root}>
					<ScrollArea class="h-80">
						<ul class="grid grid-cols-1">
							{#each allUsers as user, index (user.id)}
								<li class="flex">
									<button
										class={cn(
											'flex flex-auto flex-row items-center gap-3 px-4 py-3 transition-all hover:bg-muted lg:px-6',
											index === allUsers.length - 1 ? 'border-none' : 'border-b'
										)}
										on:click={() => $mutation.mutate(user.id)}
										disabled={$mutation.isPending}
									>
										<!-- Avatar -->
										<AvatarUser class="size-12" />

										<div class="space-y-1">
											<!-- Title -->
											<h4 class="line-clamp-1 text-start text-base font-medium leading-tight">
												{user.username}
											</h4>

											<!-- Preview -->
											<p
												class="line-clamp-1 text-start text-sm leading-tight text-muted-foreground"
											>
												{user.about}
											</p>
										</div>
									</button>
								</li>
							{/each}

							<!-- Sentinel -->
							<li class="flex items-center justify-center" bind:this={element}>
								{#if $query.isFetchingNextPage}
									<LoadingFill class="border-t py-5" />
								{/if}
							</li>
						</ul>
					</ScrollArea>
				</div>
			</IntersectionObserver>
		{/if}
	{/if}
{/if}
