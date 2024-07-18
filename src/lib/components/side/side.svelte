<script lang="ts">
	import ChatList from './chat-list.svelte';
	import AvatarPopup from './edit-profile/avatar-popup.svelte';
	import ButtonNewChat from './new-chat/new-chat-popup.svelte';
	import AddFriendPopup from './add-friend/add-friend-popup.svelte';
	import SearchFilter from './search-filter.svelte';
	import MorePopup from './more/more-popup.svelte';
</script>

<aside class="flex w-full flex-col lg:max-w-md">
	<!-- Top bar -->
	<header class="flex h-16 flex-row items-center justify-between bg-muted px-4">
		<!-- Avatar -->
		<AvatarPopup />

		<div class="flex flex-row gap-2">
			<!-- Add new chat (from friend list) -->
			<ButtonNewChat />

			<!-- Add new friend -->
			<AddFriendPopup />

			<!-- Ellipsis -->
			<MorePopup />
		</div>
	</header>

	<!-- Search / Filter chat/user -->
	<SearchFilter />

	<!-- Chat list -->
	<ChatList />
</aside>
