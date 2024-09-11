<script lang="ts">
	import AvatarUser from '$lib/components/shared/avatar-user.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { getGrouppedMessageKey } from '$lib/utils/datetime';
	import { closeChat, selectedChatStore } from '$lib/stores';
	import { createInfiniteQuery, type InfiniteData, type QueryKey } from '@tanstack/svelte-query';
	import {
		type GetChatMessageSuccessResponseBody,
		type GetChatMessageError,
		getChatMessageService
	} from '$lib/services/chats';
	import LoadingFill from '../shared/loading-fill.svelte';
	import ErrorFill from '../shared/error-fill.svelte';
	import WarningFill from '../shared/warning-fill.svelte';
	import IntersectionObserver from 'svelte-intersection-observer';
	import MyMessage from './message/my-message.svelte';
	import OppositeMessage from './message/opposite-message.svelte';
	import { afterUpdate } from 'svelte';
	import SendMessageForm from './send-message-form.svelte';

	// Component rerender every time selectedChatStore changes

	// Intersection observer
	let root: HTMLElement | undefined;
	let element: HTMLElement | undefined;
	let isIntersecting = false;

	// Scroll
	let scrollViewport: HTMLDivElement | undefined;
	let scrollContent: HTMLDivElement | undefined;
	let scrollBar: HTMLDivElement | undefined;
	let scrollThumb: HTMLDivElement | undefined;

	let isInitialChatOpen = true;
	let isNormalScrollState = true;
	let prevScrollHeight: number;

	// Get initial messages
	const limit = 15;
	$: query = createInfiniteQuery<
		GetChatMessageSuccessResponseBody,
		GetChatMessageError,
		InfiniteData<GetChatMessageSuccessResponseBody>,
		QueryKey,
		number
	>({
		initialPageParam: 1,
		refetchOnWindowFocus: false,
		enabled: !!selectedChatStore,
		retry: 1,
		queryKey: ['chat-message', $selectedChatStore?.chatId],
		getNextPageParam: (lastPage) => {
			if (lastPage.meta.page < lastPage.meta.totalPage) {
				return lastPage.meta.page + 1;
			} else {
				return undefined;
			}
		},
		queryFn: async ({ pageParam }) => {
			// await new Promise((resolve) => setTimeout(resolve, 1000));
			// throw new Error('An error occurred while fetching chat messages');

			// Get initial chat messages
			const responseBody = await getChatMessageService($selectedChatStore!.chatId, {
				page: pageParam,
				limit
			});

			return responseBody;
		}
	});

	// $: {
	// 	console.log('===============');
	// 	console.log(scrollContent.scrollHeight);
	// 	console.log(scrollContent.clientHeight);
	// 	console.log(scrollContent.offsetHeight);
	// 	console.log(scrollViewport.scrollHeight);
	// 	console.log(scrollViewport.clientHeight);
	// 	console.log(scrollViewport.offsetHeight);
	// 	console.log(prevScrollHeight);
	// 	console.log('===============');
	// }

	// Fetch more messages when intersecting
	$: {
		if (isIntersecting && $query.hasNextPage) {
			$query.fetchNextPage();
		}
	}

	// Flattened messages
	$: allSortedMessages = $query.data?.pages.flatMap((page) => page.data).reverse() ?? [];

	const scrollToBottom = () => {
		if (scrollViewport && scrollContent) {
			scrollViewport.scrollTop = scrollViewport.scrollHeight - scrollViewport.clientHeight;
		}
	};

	// Scroll to bottom when initial chat open
	$: {
		if (isInitialChatOpen && scrollViewport && scrollContent) {
			scrollToBottom();
			isInitialChatOpen = false;
		}
	}

	// Maintain scroll position when fetching next page
	afterUpdate(() => {
		if (!scrollViewport || !scrollContent) {
			// nothing
		} else if (isNormalScrollState && !$query.isFetchingNextPage) {
			// normal scroll state
		} else if (isNormalScrollState && $query.isFetchingNextPage) {
			// starts fetching next page
			isNormalScrollState = false;
			prevScrollHeight = scrollViewport.scrollHeight;
		} else if (!isNormalScrollState && !$query.isFetchingNextPage) {
			// done fetching next page
			isNormalScrollState = true;
			scrollViewport.scrollTop = scrollViewport.scrollHeight - prevScrollHeight;
		}
	});
</script>

{#if $selectedChatStore}
	<main class="flex h-screen flex-auto flex-col">
		<!-- Header -->
		<header class="flex h-[60px] flex-none flex-row items-center gap-3 border-b bg-muted pl-2 pr-4">
			<!-- Back -->
			<Button
				variant="ghost"
				size="icon"
				class="rounded-full text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
				on:click={closeChat}
			>
				<ChevronLeft />
			</Button>

			<!-- Avatar -->
			<AvatarUser src={$selectedChatStore.avatarUrl} />

			<div class="space-y-0.5">
				<!-- Title -->
				<h4 class="line-clamp-1 text-start text-base font-medium">{$selectedChatStore.title}</h4>

				<!-- Status -->
			</div>
		</header>

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
			{#if allSortedMessages.length === 0}
				<WarningFill message="No messages found" />
			{:else}
				<IntersectionObserver threshold={1} {root} {element} bind:intersecting={isIntersecting}>
					<div bind:this={root} class="flex h-1 flex-auto">
						<!-- Content -->
						<ScrollArea
							orientation="vertical"
							class="flex flex-auto"
							bind:scrollViewport
							bind:scrollContent
							bind:scrollBar
							bind:scrollThumb
						>
							<ol class="flex flex-col gap-4 px-6 py-6">
								<!-- First sentinel -->
								<li bind:this={element}>
									{#if $query.isFetchingNextPage}
										<LoadingFill class="py-5" />
									{/if}
								</li>

								{#each allSortedMessages as message, index (message.messageId)}
									{#if index == 0}
										<li class="text-center text-sm text-muted-foreground">
											{getGrouppedMessageKey(new Date(message.createdAt))}
										</li>
									{:else}
										{@const prevMessage = allSortedMessages[index - 1]}
										{@const prevGroup = getGrouppedMessageKey(new Date(prevMessage.createdAt))}
										{@const currGroup = getGrouppedMessageKey(new Date(message.createdAt))}
										{@const isSameGroup = currGroup === prevGroup}
										{#if !isSameGroup}
											<li class="text-center text-sm text-muted-foreground">
												{getGrouppedMessageKey(new Date(message.createdAt))}
											</li>
										{/if}
									{/if}

									{#if message.isCurrentUserSender}
										<li class="self-end">
											<MyMessage {message} />
										</li>
									{:else}
										<li class="self-start">
											<OppositeMessage {message} />
										</li>
									{/if}
								{/each}
							</ol>
						</ScrollArea>
					</div>
				</IntersectionObserver>
			{/if}
		{/if}

		<!-- Message Input -->
		<SendMessageForm {scrollToBottom} />
	</main>
{/if}
