<script lang="ts">
	import InboxList from './inbox/inbox-list.svelte';
	import AvatarPopup from './update-profile/avatar-popup.svelte';
	import ButtonNewChat from './new-chat/new-chat-popup.svelte';
	import SearchFilter from './inbox/search-filter.svelte';
	import MorePopup from './more/more-popup.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { writable } from 'svelte/store';
	import { debounce } from '$lib/debounce';

	// Search value
	let search = writable('');
	const debouncedSearch = debounce(search, 300);
</script>

<aside class="flex h-screen w-full flex-col border-r lg:max-w-md">
	<!-- Top bar -->
	<header
		class="flex h-[60px] flex-none flex-row items-center justify-between border-b bg-muted px-4"
	>
		<!-- Avatar -->
		<AvatarPopup />

		<div class="flex flex-row gap-2">
			<!-- Add new chat (from friend list) -->
			<ButtonNewChat />

			<!-- Ellipsis -->
			<MorePopup />
		</div>
	</header>

	<!-- Search / Filter chat/user -->
	<SearchFilter bind:value={$search} />

	<Separator orientation="horizontal" />

	<!-- Inbox list -->
	<InboxList debouncedSearch={$debouncedSearch} />
</aside>
