<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { editProfileSchema } from '$lib/schema/edit-profile';
	import { getContext } from 'svelte';
	import { cn } from '$lib/utils';
	import UploadAvatar from '$lib/components/side/edit-profile/upload-avatar.svelte';

	// Props
	let className = '';
	export { className as class };

	// TODO: Get user initial data from context
	const data =
		(getContext('edit-profile-data') as SuperValidated<Infer<typeof editProfileSchema>>) || {};

	const form = superForm(data, {
		validators: zodClient(editProfileSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class={cn('space-y-4', className)}>
	<!-- Avatar -->
	<Form.Field {form} name="avatar">
		<Form.Control let:attrs>
			<Form.Label>Avatar</Form.Label>
			<UploadAvatar />
		</Form.Control>
	</Form.Field>

	<!-- Name -->
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input placeholder="Name" {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- About Status -->
	<Form.Field {form} name="about">
		<Form.Control let:attrs>
			<Form.Label>About</Form.Label>
			<Input placeholder="About" {...attrs} bind:value={$formData.about} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Submit -->
	<Form.Button class="w-full">Save Changes</Form.Button>
</form>
