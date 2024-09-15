<script lang="ts">
	import AvatarUser from '$lib/components/shared/avatar-user.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { getGrouppedMessageKey } from '$lib/utils/datetime';
	import { closeChat, selectedChatStore, sessionStore } from '$lib/stores';
	import {
		createInfiniteQuery,
		createMutation,
		createQuery,
		useQueryClient,
		type InfiniteData,
		type QueryKey
	} from '@tanstack/svelte-query';
	import {
		type GetChatMessageSuccessResponseBody,
		type GetChatMessageError,
		getChatMessageService,
		type ReadChatSuccessResponseBody,
		type ReadChatError,
		type ReadChatRequestBody,
		readChatService,
		updateReadChatQueryDataInbox,
		updateReadChatQueryDataMessage,
		getStatusService
	} from '$lib/services/chats';
	import LoadingFill from '$lib/components/shared/loading-fill.svelte';
	import ErrorFill from '$lib/components/shared/error-fill.svelte';
	import WarningFill from '$lib/components/shared/warning-fill.svelte';
	import IntersectionObserver from 'svelte-intersection-observer';
	import MyMessage from './message/my-message.svelte';
	import OppositeMessage from './message/opposite-message.svelte';
	import { afterUpdate } from 'svelte';
	import SendMessageForm from './send-message-form.svelte';
	import { ToastResponseFactory } from '$lib/components/ui/sonner';
	import { listenEvent } from '$lib/utils/socket-io';
	import { STATUS } from '$types';

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
	$: queryMessages = createInfiniteQuery<
		GetChatMessageSuccessResponseBody,
		GetChatMessageError,
		InfiniteData<GetChatMessageSuccessResponseBody>,
		QueryKey,
		string | undefined
	>({
		enabled: !!$selectedChatStore,
		retry: 1,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		queryKey: ['chat-message', $selectedChatStore?.chatId],
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
			// throw new Error('An error occurred while fetching chat messages');

			// Get initial chat messages
			const responseBody = await getChatMessageService($selectedChatStore!.chatId, {
				cursor: pageParam,
				limit
			});

			return responseBody;
		}
	});

	// Read chat mutation
	const queryClient = useQueryClient();
	const mutation = createMutation<ReadChatSuccessResponseBody, ReadChatError, ReadChatRequestBody>({
		mutationFn: async (body) => {
			// await new Promise((resolve) => setTimeout(resolve, 2000));
			// throw new Error('An error occurred while reading chat');

			const responseBody = await readChatService(body);
			return responseBody;
		},
		onError: (error) => {
			// Error toast
			ToastResponseFactory.createError(error);
		},
		onSuccess: (response) => {
			// Inbox query data
			updateReadChatQueryDataInbox(queryClient, response.data);

			// Messages query data
			updateReadChatQueryDataMessage(queryClient, response.data);
		}
	});

	// Fetch more messages when intersecting
	$: {
		if (isIntersecting && !$queryMessages.isFetchingNextPage && $queryMessages.hasNextPage) {
			$queryMessages.fetchNextPage();
		}
	}

	// Flattened messages
	$: allSortedMessages = $queryMessages.data?.pages.flatMap((page) => page.data).reverse() ?? [];

	const scrollToBottom = () => {
		if (scrollViewport && scrollContent) {
			scrollViewport.scrollTop = scrollViewport.scrollHeight - scrollViewport.clientHeight;
		}
	};

	// Initial chat open
	// Note: scrollViewport & content only rendered IF $queryMessages.isSuccess and data is not empty
	$: {
		if (isInitialChatOpen && scrollViewport && scrollContent) {
			// Scroll
			scrollToBottom();

			// Read chat
			$mutation.mutate({ chatId: $selectedChatStore!.chatId });

			isInitialChatOpen = false;
		}
	}

	// Maintain scroll position when fetching next page
	afterUpdate(() => {
		if (!scrollViewport || !scrollContent) {
			// nothing
		} else if (isNormalScrollState && !$queryMessages.isFetchingNextPage) {
			// normal scroll state
		} else if (isNormalScrollState && $queryMessages.isFetchingNextPage) {
			// starts fetching next page
			isNormalScrollState = false;
			prevScrollHeight = scrollViewport.scrollHeight;
		} else if (!isNormalScrollState && !$queryMessages.isFetchingNextPage) {
			// done fetching next page
			isNormalScrollState = true;
			scrollViewport.scrollTop = scrollViewport.scrollHeight - prevScrollHeight;
		}
	});

	// Online & typing state
	let isOtherUserOnline = false;
	let isOtherUserTyping = false;

	// Handle initial status
	const queryOtherUserOnline = createQuery({
		enabled: !!$selectedChatStore,
		retry: 1,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		queryKey: ['status', $selectedChatStore?.chatId],
		queryFn: async () => {
			const responseBody = await getStatusService({ chatId: $selectedChatStore!.chatId });
			return responseBody.data;
		}
	});
	$: {
		if ($queryOtherUserOnline.isSuccess) {
			isOtherUserOnline = $queryOtherUserOnline.data?.status === STATUS.ONLINE;
		}
	}

	// Listen typing event
	listenEvent('typing', () => {
		isOtherUserTyping = true;
	});
	listenEvent('stopTyping', () => {
		isOtherUserTyping = false;
	});

	// Listen to future online status
	listenEvent('userOnline', () => {
		isOtherUserOnline = true;
	});
	listenEvent('userOffline', () => {
		isOtherUserOnline = false;
	});
</script>

{#if $selectedChatStore}
	<main class="flex h-screen flex-auto flex-col">
		<!-- Header -->
		<header
			class="flex h-[60px] flex-none flex-row items-center gap-2.5 border-b bg-muted pl-2 pr-4"
		>
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
			<div class="flex flex-row items-center gap-4">
				<AvatarUser src={$selectedChatStore.avatarUrl} />

				<div class="space-y-px">
					<!-- Title -->
					<h4 class="line-clamp-1 text-start text-base font-medium">{$selectedChatStore.title}</h4>

					<!-- Status -->
					{#if isOtherUserTyping}
						<p class="text-xs font-medium text-muted-foreground">Typing...</p>
					{:else if isOtherUserOnline}
						<p class="text-xs font-medium text-muted-foreground">Online</p>
					{/if}
				</div>
			</div>
		</header>

		{#if $queryMessages.isPending}
			<LoadingFill />
		{/if}

		{#if $queryMessages.isError}
			<ErrorFill
				statusText={$queryMessages.error.response?.statusText}
				message={$queryMessages.error.response?.data.message}
				refetch={$queryMessages.refetch}
			/>
		{/if}

		{#if $queryMessages.isSuccess}
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
									{#if $queryMessages.isFetchingNextPage}
										<LoadingFill class="py-5" />
									{/if}
								</li>

								{#each allSortedMessages as message, index (message.messageId)}
									{#if index == 0}
										<li class="mb-4 text-center text-sm text-muted-foreground">
											{getGrouppedMessageKey(new Date(message.createdAt))}
										</li>
									{:else}
										{@const prevMessage = allSortedMessages[index - 1]}
										{@const prevGroup = getGrouppedMessageKey(new Date(prevMessage.createdAt))}
										{@const currGroup = getGrouppedMessageKey(new Date(message.createdAt))}
										{@const isSameGroup = currGroup === prevGroup}
										{#if !isSameGroup}
											<li class="mb-4 mt-12 text-center text-sm text-muted-foreground">
												{getGrouppedMessageKey(new Date(message.createdAt))}
											</li>
										{/if}
									{/if}

									{#if message.senderId == $sessionStore?.userId}
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

			<!-- Message Input -->

			<SendMessageForm {scrollToBottom} />
		{/if}
	</main>
{/if}
