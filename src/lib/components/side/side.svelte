<script lang="ts">
	import ChatList from './chat-list.svelte';
	import AvatarEditProfile from './edit-profile/avatar-popup.svelte';
	import ButtonNewChat from './button-new-chat.svelte';
	import ButtonNewFriend from './button-new-friend.svelte';
	import SearchFilter from './search-filter.svelte';
	import ButtonMore from './button-more.svelte';
</script>

<aside class="flex w-full flex-col lg:max-w-md">
	<!-- Top bar -->
	<header class="flex h-16 flex-row items-center justify-between bg-muted px-4">
		<!-- Avatar -->
		<AvatarEditProfile />

		<div class="flex flex-row gap-2">
			<!-- Add new chat (from friend list) -->
			<ButtonNewChat />

			<!-- Add new friend -->
			<ButtonNewFriend />

			<!-- Ellipsis -->
			<ButtonMore />
		</div>
	</header>

	<!-- Search / Filter chat/user -->
	<SearchFilter />

	<!-- Chat list -->
	<ChatList />
</aside>
