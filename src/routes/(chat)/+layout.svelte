<script lang="ts">
	import ProtectedLayout from '$lib/components/auth/protected-layout.svelte';
	import SocketIoLayout from '$lib/components/auth/socket-io-layout.svelte';
</script>

<ProtectedLayout protectedTo="authenticated-only">
	<SocketIoLayout>
		<slot />
	</SocketIoLayout>
</ProtectedLayout>
