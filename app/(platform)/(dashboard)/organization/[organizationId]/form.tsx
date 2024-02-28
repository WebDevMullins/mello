'use client'

import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'

import FormInput from '@/components/form/form-input'
import FormSubmit from '@/components/form/form-submit'

const Form = () => {
	const { fieldErrors, execute } = useAction(createBoard)

	const onSubmit = (formData: FormData) => {
		execute({
			title: formData.get('title') as string
		})
	}

	return (
		<div>
			<form action={onSubmit}>
				<FormInput
					id='title'
					errors={fieldErrors}
					label='Board Title'
				/>
				<FormSubmit>Save</FormSubmit>
			</form>
		</div>
	)
}
export default Form
