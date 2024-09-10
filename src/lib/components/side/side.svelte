<script lang="ts">
	import InboxList from './inbox/inbox-list.svelte';
	import AvatarPopup from './update-profile/avatar-popup.svelte';
	import NewChatPopup from './new-chat/new-chat-popup.svelte';
	import SearchFilter from './inbox/search-filter.svelte';
	import MoreDropdown from './more/more-dropdown.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { writable } from 'svelte/store';
	import { debounce } from '$lib/debounce';
	import { Moon, Sun } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toggleMode } from 'mode-watcher';

	// Search value
	let search = writable('');
	const debouncedSearch = debounce(search, 300);
</script>

<aside class="flex h-screen w-full flex-auto flex-col border-r lg:max-w-md">
	<!-- Top bar -->
	<header
		class="flex h-[60px] flex-none flex-row items-center justify-between border-b bg-muted px-4"
	>
		<!-- Avatar -->
		<AvatarPopup />

		<div class="flex flex-row gap-2">
			<!-- Add new chat (from friend list) -->
			<NewChatPopup />

			<!-- Toggle Theme -->
			<Button
				variant="ghost"
				size="icon"
				class="rounded-full text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
				aria-label="Toggle theme"
				on:click={toggleMode}
			>
				<Sun
					class="size-[1.375rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute size-[1.375rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
			</Button>

			<!-- Ellipsis -->
			<MoreDropdown />
		</div>
	</header>

	<!-- Search / Filter chat/user -->
	<SearchFilter bind:value={$search} />

	<Separator orientation="horizontal" />

	<!-- Inbox list -->
	<InboxList debouncedSearch={$debouncedSearch} />
</aside>
