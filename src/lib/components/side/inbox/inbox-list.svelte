<script lang="ts">
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { cn } from '$lib/utils/ui';
	import { createInfiniteQuery, type InfiniteData, type QueryKey } from '@tanstack/svelte-query';
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
		number
	>({
		queryKey: ['chat-inbox', debouncedSearch],
		initialPageParam: 1,
		retry: 1,
		refetchOnWindowFocus: false,
		getNextPageParam: (lastPage) => {
			if (lastPage.meta.page < lastPage.meta.totalPage) {
				return lastPage.meta.page + 1;
			} else {
				return undefined;
			}
		},
		queryFn: async ({ pageParam }) => {
			// await new Promise((resolve) => setTimeout(resolve, 2000));
			// throw new Error('An error occurred while fetching users');

			// Get initial chat inbox
			const responseBody = getChatInboxService({
				title: debouncedSearch,
				page: pageParam,
				limit
			});

			// TODO: Connect to the chat room

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
		selectedChatStore.set(chat);
	};
</script>

{#if $query.isPending}
	<LoadingFill />
{/if}

{#if $query.isError}
	<ErrorFill
		statusText={$query.error.response?.statusText}
		message={$query.error.response?.data.message}
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
									<div class="flex flex-row items-center gap-3">
										<!-- Avatar -->
										<AvatarUser src={chat.avatarUrl} class="size-12" />

										<div class="space-y-1">
											<!-- Title -->
											<h4
												class={cn(
													'line-clamp-1 text-start text-base leading-tight',
													isUnread ? 'font-semibold' : 'font-medium'
												)}
											>
												{chat.title}
											</h4>

											<!-- Preview -->
											<p
												class={cn(
													'line-clamp-1 text-start text-sm leading-tight',
													isUnread
														? 'font-semibold text-gray-600 dark:text-gray-300'
														: 'font-medium text-muted-foreground'
												)}
											>
												{chat.lastMessage.deletedAt
													? 'This message was deleted'
													: chat.lastMessage.content}
											</p>
										</div>
									</div>

									<div class="flex flex-none flex-col items-end gap-1">
										<!-- Time preview -->
										<p
											class={cn(
												'text-xs',
												isUnread ? 'font-bold text-primary' : 'font-medium text-muted-foreground'
											)}
										>
											{getRelativeTime(new Date(chat.lastMessage.createdAt))}
										</p>

										<!-- Chat count -->
										{#if isUnread}
											<div
												class="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground"
											>
												{chat.unreadCount}
											</div>
										{:else}
											<div class="size-5"></div>
										{/if}
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
