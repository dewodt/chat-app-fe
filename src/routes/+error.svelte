<script lang="ts">
	import { page } from '$app/stores';
	import ErrorFill from '$lib/components/shared/error-fill.svelte';
</script>

<ErrorFill statusText={'Page Error'} message={$page.error?.message} />
