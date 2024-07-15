<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { addFriendSchema } from '$lib/schema/add-friend';
	import { cn } from '$lib/utils';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let className = '';
	export { className as class };

	const data = {} as SuperValidated<Infer<typeof addFriendSchema>>;

	const form = superForm(data, {
		validators: zodClient(addFriendSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class={cn('space-y-4', className)}>
	<!-- Username -->
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input placeholder="Username" {...attrs} bind:value={$formData.username} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Submit -->
	<Form.Button class="w-full">Submit</Form.Button>
</form>
