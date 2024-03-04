import { XCircleIcon } from 'lucide-react'

interface FormErrorsProps {
	id: string
	errors?: Record<string, string[] | undefined>
}

const FormErrors = ({ id, errors }: FormErrorsProps) => {
	if (!errors) return null

	return (
		<div
			id={`${id}-error`}
			aria-live='polite'
			className='mt-2 text-xs text-destructive'>
			{errors?.[id]?.map((error: string) => (
				<div
					key={error}
					className='flex items-center rounded-sm border border-destructive bg-destructive/20 p-2 font-medium'>
					<XCircleIcon
						size={16}
						className='mr-2'
					/>
					{error}
				</div>
			))}
		</div>
	)
}
export default FormErrors
