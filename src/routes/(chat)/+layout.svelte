<script>
	import ProtectedLayout from '$lib/components/auth/protected-layout.svelte';
</script>

<ProtectedLayout protectedTo="authenticated-only">
	<slot />
</ProtectedLayout>
