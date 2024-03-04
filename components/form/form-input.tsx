'use client'

import { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import FormErrors from './form-errors'

interface FormInputProps {
	id: string
	label?: string
	type?: string
	placeholder?: string
	required?: boolean
	disabled?: boolean
	errors?: Record<string, string[] | undefined>
	className?: string
	defaultValue?: string
	onBlur?: () => void
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	(
		{
			id,
			label,
			type,
			placeholder,
			required,
			disabled,
			errors,
			className,
			defaultValue = '',
			onBlur
		},
		ref
	) => {
		const { pending } = useFormStatus()
		return (
			<div className='space-y-2'>
				<div className='space-y-1'>
					{label ? (
						<Label
							htmlFor={id}
							className='text-xs font-semibold'>
							{label}
						</Label>
					) : null}
					<Input
						onBlur={onBlur}
						defaultValue={defaultValue}
						ref={ref}
						id={id}
						type={type}
						placeholder={placeholder}
						required={required}
						disabled={disabled || pending}
						name={id}
						className={cn('h-7 px-2 py-1 text-sm', className)}
						aria-describedby={`${id}-error`}
					/>
				</div>
				<FormErrors
					id={id}
					errors={errors}
				/>
			</div>
		)
	}
)
export default FormInput

FormInput.displayName = 'FormInput'
