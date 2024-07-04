<script lang="ts">
	import type { PageData } from './$types.js';
	import ChangePasswordForm from './change-password-form.svelte';
	import * as Card from '$lib/components/ui/card';
	import HeadTemplate from '$lib/components/head/head-template.svelte';

	export let data: PageData;
</script>

<HeadTemplate
	title="Change Password | ChatApp"
	description="Change your password to ChatApp to secure your account. ChatApp is a free chat application that allows you to chat with your friends and family in real-time. Change your password now to secure your account."
/>

<main class="flex flex-auto items-center justify-center bg-accent p-5 py-12 sm:p-16 lg:p-24">
	<section class="w-full max-w-96">
		<Card.Root>
			<Card.Header>
				<!-- Title -->
				<h1 class="text-center text-2xl font-bold text-primary">Change Password</h1>
			</Card.Header>
			<Card.Content>
				<!-- Form Component -->
				<ChangePasswordForm data={data.form} />
			</Card.Content>
		</Card.Root>
	</section>
</main>
