'use client'

import { XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'

import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

import FormInput from './form-input'
import FormPicker from './form-picker'
import { FormSubmit } from './form-submit'

interface FormPopoverProps {
	children: React.ReactNode
	side?: 'left' | 'right' | 'top' | 'bottom'
	align?: 'start' | 'center' | 'end'
	sideOffset?: number
	alignOffset?: number
}

const FormPopover = ({
	children,
	side = 'bottom',
	align,
	sideOffset = 0,
	alignOffset = 0
}: FormPopoverProps) => {
	const proModal = useProModal()
	const router = useRouter()

	const closeRef = useRef<ElementRef<'button'>>(null)

	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess(data) {
			toast.success('Board created!')
			closeRef.current?.click()
			router.push(`/board/${data.id}`)
		},
		onError(error) {
			toast.error(error)
			proModal.onOpen()
		}
	})

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const image = formData.get('image') as string

		execute({ title, image })
	}
	return (
		<Popover modal>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				align={align}
				alignOffset={alignOffset}
				className='w-80 pt-3'
				side={side}
				sideOffset={sideOffset}>
				<div className='pb-4 text-center text-sm font-medium'>Create board</div>
				<PopoverClose
					ref={closeRef}
					asChild>
					<Button
						className='absolute right-2 top-2 h-auto w-auto p-2'
						variant='ghost'>
						<XIcon size={16} />
					</Button>
				</PopoverClose>
				<form
					action={onSubmit}
					className='space-y-4'>
					<div className='space-y-4'>
						<FormPicker
							id='image'
							errors={fieldErrors}
						/>
						<FormInput
							id='title'
							label='Board title'
							type='text'
							errors={fieldErrors}
						/>
					</div>
					<FormSubmit className='w-full'>Create</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}
export default FormPopover
