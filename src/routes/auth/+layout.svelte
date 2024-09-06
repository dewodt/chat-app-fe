<script>
	import ProtectedLayout from '$lib/components/auth/protected-layout.svelte';
</script>

<ProtectedLayout protectedTo="unauthenticated-only">
	<slot />
</ProtectedLayout>
