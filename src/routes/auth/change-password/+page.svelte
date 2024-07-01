<script lang="ts">
	import type { PageData } from './$types.js';
	import ChangePasswordForm from './change-password-form.svelte';
	import * as Card from '$lib/components/ui/card';

	export let data: PageData;
</script>

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
