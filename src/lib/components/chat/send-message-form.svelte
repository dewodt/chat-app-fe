<script lang="ts">
	import { sendMessageSchema } from '$lib/schemas/send-message';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';

	import Input from '$lib/components/ui/input/input.svelte';
	import { SendHorizontal } from 'lucide-svelte';

	const form = superForm(defaults(zod(sendMessageSchema)), {
		SPA: true,
		resetForm: true,
		validators: zod(sendMessageSchema),
		onUpdate: async ({ form }) => {
			if (!form.valid) {
				return;
			}
			const jsonData = $formData;
			// $mutation.mutate(jsonData);
		}
	});

	const { form: formData, enhance, errors } = form;
</script>

<form use:enhance class="flex flex-row gap-3.5 border-t bg-muted px-4 py-3.5">
	<!-- Message -->
	<Form.Field {form} name="message" class="flex-auto">
		<Form.Control let:attrs>
			<Input
				placeholder="Type a message"
				class="focus-visible:ring-0 focus-visible:ring-offset-0"
				autocomplete="off"
				bind:value={$formData.message}
				{...attrs}
			/>
		</Form.Control>
	</Form.Field>

	<Form.Button size="icon" class="flex-none" disabled={!$formData.message}>
		<SendHorizontal class="size-5" />
	</Form.Button>
</form>
