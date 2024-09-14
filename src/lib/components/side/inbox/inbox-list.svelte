<script lang="ts">
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { cn } from '$lib/utils/ui';
	import {
		createInfiniteQuery,
		createMutation,
		useQueryClient,
		type InfiniteData,
		type QueryKey
	} from '@tanstack/svelte-query';
	import AvatarUser from '$lib/components/shared/avatar-user.svelte';
	import {
		getChatInboxService,
		type GetChatInboxError,
		type GetChatInboxSuccessResponseBody
	} from '$lib/services/chats/get-chat-inbox';
	import LoadingFill from '$lib/components/shared/loading-fill.svelte';
	import ErrorFill from '$lib/components/shared/error-fill.svelte';
	import IntersectionObserver from 'svelte-intersection-observer';
	import WarningFill from '$lib/components/shared/warning-fill.svelte';
	import type { ChatInbox } from '$types';
	import { selectedChatStore } from '$lib/stores';
	import { getRelativeTime } from '$lib/utils/datetime';
	import { joinChatRoomsService } from '$lib/services/chats/join-chatrooms';
	import {
		readChatService,
		type ReadChatError,
		type ReadChatRequestBody,
		type ReadChatSuccessResponseBody
	} from '$lib/services/chats';
	import { ToastResponseFactory } from '$lib/components/ui/sonner';

	// Props
	export let debouncedSearch: string;

	// Intersection observer
	let root: HTMLElement;
	let element: HTMLElement;
	let isIntersecting = false;

	// Infinite query
	const limit = 13;
	$: query = createInfiniteQuery<
		GetChatInboxSuccessResponseBody,
		GetChatInboxError,
		InfiniteData<GetChatInboxSuccessResponseBody>,
		QueryKey,
		string | undefined
	>({
		queryKey: ['chat-inbox', debouncedSearch],
		retry: 1,
		refetchOnWindowFocus: false,
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => {
			if (lastPage.meta.nextCursor) {
				return lastPage.meta.nextCursor;
			} else {
				return undefined;
			}
		},
		queryFn: async ({ pageParam }) => {
			// await new Promise((resolve) => setTimeout(resolve, 2000));
			// throw new Error('An error occurred while fetching users');

			// Get initial chat inbox
			const responseBody = await getChatInboxService({
				title: debouncedSearch,
				cursor: pageParam,
				limit
			});

			// Join chat rooms
			const chatIds = responseBody.data.map((chat) => chat.chatId);
			if (chatIds.length > 0) {
				await joinChatRoomsService({ chatIds });
			}

			return responseBody;
		}
	});

	$: allChatInbox = $query.data?.pages.flatMap((page) => page.data) ?? [];

	$: {
		if (isIntersecting && !$query.isFetchingNextPage && $query.hasNextPage) {
			// console.log('fetching');
			$query.fetchNextPage();
		}
	}

	const handleSelectChat = (chat: ChatInbox) => {
		if ($selectedChatStore && $selectedChatStore.chatId === chat.chatId) {
			return;
		}

		// Update selected chat state
		selectedChatStore.set(chat);
	};
</script>

{#if $query.isPending}
	<LoadingFill />
{/if}

{#if $query.isError}
	<ErrorFill
		statusText={$query.error.response?.statusText}
		message={$query.error.response?.data.message || $query.error.message}
		refetch={$query.refetch}
	/>
{/if}

{#if $query.isSuccess}
	{#if allChatInbox.length === 0}
		<WarningFill message="No chat found" />
	{:else}
		<IntersectionObserver {root} {element} threshold={1} bind:intersecting={isIntersecting}>
			<div bind:this={root} class="flex h-1 flex-auto">
				<ScrollArea class="flex flex-auto">
					<ul class="grid grid-cols-1">
						{#each allChatInbox as chat, index (chat.chatId)}
							{@const isUnread = chat.unreadCount > 0}
							<li class="flex">
								<button
									class={cn(
										'flex flex-auto flex-row items-center justify-between gap-3 border-b px-4 py-3',
										index === allChatInbox.length - 1 ? 'border-none' : 'border-b',
										$selectedChatStore?.chatId === chat.chatId
											? 'bg-muted'
											: 'bg-background transition-all hover:bg-muted'
									)}
									on:click={() => handleSelectChat(chat)}
								>
									<div class="flex flex-row items-center gap-4">
										<!-- Avatar -->
										<AvatarUser src={chat.avatarUrl} class="size-12" />

										<div class="space-y-1">
											<!-- Title -->
											<h4
												class={cn(
													'line-clamp-1 text-start text-base leading-tight',
													isUnread ? 'font-bold' : 'font-medium'
												)}
											>
												{chat.title}
											</h4>

											<!-- Preview -->
											{#if chat.latestMessage}
												<p
													class={cn(
														'line-clamp-1 text-start text-sm leading-tight',
														isUnread
															? 'font-semibold text-gray-600 dark:text-gray-300'
															: 'font-medium text-muted-foreground'
													)}
												>
													{chat.latestMessage.deletedAt
														? 'This message was deleted'
														: chat.latestMessage.content}
												</p>
											{/if}
										</div>
									</div>

									{#if chat.latestMessage}
										<div class="flex flex-none flex-col items-end gap-1">
											<!-- Time preview -->
											<p
												class={cn(
													'text-xs',
													isUnread ? 'font-bold text-primary' : 'font-medium text-muted-foreground'
												)}
											>
												{getRelativeTime(new Date(chat.latestMessage.createdAt))}
											</p>

											<!-- Chat count -->
											{#if isUnread}
												<div
													class="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground"
												>
													{chat.unreadCount > 9 ? '9+' : chat.unreadCount}
												</div>
											{:else}
												<div class="invisible size-5"></div>
											{/if}
										</div>
									{/if}
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
