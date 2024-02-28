import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'

interface FormSubmitProps {
	children: React.ReactNode
	disabled?: boolean
	className?: string
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
}

const FormSubmit = ({
	children,
	disabled,
	className,
	variant
}: FormSubmitProps) => {
	const { pending } = useFormStatus()

	return (
		<Button
			disabled={disabled || pending}
			className={className}
			variant={variant}
			type='submit'>
			{children}
		</Button>
	)
}
export default FormSubmit
