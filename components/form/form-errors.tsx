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
			className='mt-2 text-xs text-rose-500'>
			{errors?.[id]?.map((error: string) => (
				<div
					key={error}
					className='flex items-center rounded-sm border border-rose-500 bg-rose-500/10 p-2 font-medium'>
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
