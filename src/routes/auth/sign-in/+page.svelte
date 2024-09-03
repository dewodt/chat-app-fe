<script lang="ts">
	import type { PageData } from './$types.js';
	import SignInForm from './sign-in-form.svelte';
	import * as Card from '$lib/components/ui/card';
	import HeadTemplate from '$lib/components/head/head-template.svelte';

	export let data: PageData;
</script>

<HeadTemplate
	title="Sign In | ChatApp"
	description="Sign in to ChatApp to start chatting with your friends and family. ChatApp is a free chat application that allows you to chat with your friends and family in real-time. Sign in now to start chatting with your friends and family.	"
/>

<main class="flex flex-auto items-center justify-center bg-accent p-5 py-12 sm:p-16 lg:p-24">
	<section class="w-full max-w-96">
		<Card.Root>
			<Card.Header>
				<!-- Title -->
				<h1 class="text-center text-3xl font-bold text-primary">Sign In</h1>
			</Card.Header>

			<Card.Content>
				<!-- Form Component -->
				<SignInForm data={data.form} />
			</Card.Content>
		</Card.Root>
	</section>
</main>
