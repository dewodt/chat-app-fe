<script lang="ts">
	import { onMount } from 'svelte';

	export let title: string;
	export let description: string;

	let stylesheetLink: HTMLLinkElement;

	onMount(() => {
		if (stylesheetLink) {
			stylesheetLink.onload = () => {
				stylesheetLink.media = 'all';
			};
		}
	});
</script>

<svelte:head>
	<!-- Viewport -->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="color-scheme" content="dark" />
	<meta name="theme-color" content="black" />

	<!-- SEO -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="application-name" content="Chat App" />
	<link rel="author" href="https://dewodt.com" />
	<meta name="author" content="Dewantoro Triatmojo" />
	<link rel="manifest" href="/manifest.webmanifest" />
	<meta name="generator" content="SvelteKit" />
	<meta name="keywords" content="Chat App" />
	<meta name="creator" content="Dewantoro Triatmojo" />
	<meta name="category" content="social" />
	<link rel="sitemap" href="/sitemap-index.xml" />

	<!-- Icon -->
	<link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="48x48" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/manifest.webmanifest" />

	<!-- Opengraph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="https://chat.dewodt.com/" />
	<meta property="og:site_name" content="Chat App" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content="/link-preview.png" />
	<meta property="og:image:alt" content="Chat App Logo" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:type" content="website" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@dewodt" />
	<meta name="twitter:creator:id" content="1126695039633989634" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="/link-preview.png" />
	<meta name="twitter:image:alt" content="Chat App Logo" />

	<!-- Font -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"
		media="print"
		bind:this={stylesheetLink}
	/>
	<noscript>
		<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"
		/>
	</noscript>
</svelte:head>
