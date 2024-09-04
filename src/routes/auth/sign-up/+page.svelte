<script lang="ts">
	import SignUpForm from './sign-up-form.svelte';
	import HeadTemplate from '$lib/components/head/head-template.svelte';
	import * as Card from '$lib/components/ui/card';
	import ProtectedLayout from '$lib/components/auth/protected-layout.svelte';
</script>

<HeadTemplate
	title="Sign Up | ChatApp"
	description="Sign up to ChatApp to start chatting with your friends and family. ChatApp is a free chat application that allows you to chat with your friends and family in real-time. Sign up now to start chatting with your friends and family.	"
/>

<ProtectedLayout protectedTo="unauthenticated-only">
	<main class="flex flex-auto items-center justify-center bg-accent p-5 py-12 sm:p-16 lg:p-24">
		<section class="w-full max-w-96">
			<Card.Root>
				<Card.Header>
					<!-- Title -->
					<h1 class="text-center text-3xl font-bold text-primary">Sign Up</h1>
				</Card.Header>

				<Card.Content>
					<!-- Form Component -->
					<SignUpForm />
				</Card.Content>
			</Card.Root>
		</section>
	</main>
</ProtectedLayout>
