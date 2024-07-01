<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { changePasswordFormSchema } from '$lib/schema/change-password.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<typeof changePasswordFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(changePasswordFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-5">
	<!-- Old Password -->
	<Form.Field {form} name="oldPassword">
		<Form.Control let:attrs>
			<Form.Label>Old Password</Form.Label>
			<Input
				placeholder="Old Password"
				type="password"
				{...attrs}
				bind:value={$formData.oldPassword}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- New Password -->
	<Form.Field {form} name="newPassword">
		<Form.Control let:attrs>
			<Form.Label>New Password</Form.Label>
			<Input
				placeholder="New Password"
				type="password"
				{...attrs}
				bind:value={$formData.newPassword}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Confirm Password -->
	<Form.Field {form} name="confirmNewPassword">
		<Form.Control let:attrs>
			<Form.Label>Confirm Password</Form.Label>
			<Input
				placeholder="Confirm Password"
				type="password"
				{...attrs}
				bind:value={$formData.confirmNewPassword}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Sign In -->
	<Form.Button class="w-full">Change Password</Form.Button>
</form>
