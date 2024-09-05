<script lang="ts">
	import { getSessionService, type GetSessionError } from '$lib/services/auth';
	import { createQuery } from '@tanstack/svelte-query';
	import { sessionStore } from '$lib/stores/session';
	import LoadingFill from '../shared/loading-fill.svelte';
	import ErrorFill from '../shared/error-fill.svelte';
	import { goto } from '$app/navigation';
	import type { Session } from '$types';

	export let protectedTo: 'authenticated-only' | 'unauthenticated-only';

	const query = createQuery<Session, GetSessionError>({
		queryKey: ['session'],
		retry: 1,
		refetchOnWindowFocus: false,
		queryFn: async () => {
			// await new Promise((resolve) => setTimeout(resolve, 2500));
			// throw new Error('An error occurred');
			const responseBody = await getSessionService();
			return responseBody.data;
		}
	});

	// Protected only
	// Not auth => redirect to sign in (error and status 401)
	// Auth => show content (success or error non 401)

	// Unprotected only
	// Auth => redirect to home (success)
	// Not auth => show content (error and status 401)

	$: isRedirectSignIn =
		protectedTo === 'authenticated-only' &&
		window.location.pathname !== '/auth/sign-in' &&
		$query.isError &&
		$query.error.response?.status === 401;

	$: isRedirectHome =
		protectedTo === 'unauthenticated-only' && $query.isSuccess && window.location.pathname !== '/';

	$: {
		if (isRedirectHome) {
			goto('/');
		} else if (isRedirectSignIn) {
			goto('/auth/sign-in');
		}
	}

	$: {
		if ($query.isSuccess) {
			sessionStore.set($query.data);
		} else {
			sessionStore.set(null);
		}
	}
</script>

{#if protectedTo === 'authenticated-only'}
	<!-- Querying or redirecting unauthententicated -->
	{#if $query.isPending || ($query.isError && $query.error.response?.status === 401)}
		<LoadingFill />
	{/if}

	<!-- Other errors -->
	{#if $query.isError && $query.error.response?.status !== 401}
		<ErrorFill
			statusText={$query.error.response?.statusText}
			message={$query.error.response?.data.message}
			refetch={$query.refetch}
		/>
	{/if}

	<!-- Authenticated -->
	{#if $query.isSuccess}
		<slot />
	{/if}
{:else if protectedTo === 'unauthenticated-only'}
	<!-- Querying or redirecting authenticated -->
	{#if $query.isPending || $query.isSuccess}
		<LoadingFill />
	{/if}

	<!-- Other errors -->
	{#if $query.isError && $query.error.response?.status !== 401}
		<ErrorFill
			statusText={$query.error.response?.statusText}
			message={$query.error.response?.data.message}
			refetch={$query.refetch}
		/>
	{/if}

	<!-- Not authenticated -->
	{#if $query.isError && $query.error.response?.status === 401}
		<slot />
	{/if}
{/if}
