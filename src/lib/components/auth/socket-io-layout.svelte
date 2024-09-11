<script lang="ts">
	import { sessionStore } from '$lib/stores';
	import { socket } from '$lib/utils/socket-io';
	import { onMount } from 'svelte';

	onMount(() => {
		if (sessionStore) {
			// Connect to socket io
			socket.connect();
		}
	});

	// Event listeners
	// on connect
	socket.on('connect', () => {
		// console.log('Connected to socket');
	});

	// on disconnect
	socket.on('disconnect', () => {
		// console.log('Disconnected from socket');
	});
</script>

<slot />
