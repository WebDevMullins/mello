'use client'

import { PlusIcon, XIcon } from 'lucide-react'
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from 'react'

import { createCard } from '@/actions/create-card'
import { FormSubmit } from '@/components/form/form-submit'
import { FormTextarea } from '@/components/form/form-textarea'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

interface CardFormProps {
	listId: string
	isEditing: boolean
	enableEditing: () => void
	disableEditing: () => void
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
	({ listId, isEditing, enableEditing, disableEditing }, ref) => {
		const params = useParams()
		const formRef = useRef<ElementRef<'form'>>(null)
		const closeRef = useRef<ElementRef<'button'>>(null)

		const { execute, fieldErrors } = useAction(createCard, {
			onSuccess(data) {
				toast.success(`Card "${data.title}" created`)
				formRef.current?.reset()
				closeRef.current?.click()
			},
			onError(error) {
				toast.error(error)
			}
		})

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				disableEditing()
			}
		}

		useOnClickOutside(formRef, disableEditing)
		useEventListener('keydown', onKeyDown)

		const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
			e
		) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault()
				formRef.current?.requestSubmit()
			}
		}

		const onSubmit = (formData: FormData) => {
			const title = formData.get('title') as string
			const listId = formData.get('listId') as string
			const boardId = formData.get('boardId') as string

			execute({ title, listId, boardId })
		}

		if (isEditing) {
			return (
				<form
					ref={formRef}
					action={onSubmit}
					className='m-1 space-y-4 py-0.5'>
					<FormTextarea
						ref={ref}
						id='title'
						placeholder='Enter a title for this card'
						onKeyDown={onTextareaKeyDown}
						errors={fieldErrors}
					/>
					<input
						readOnly
						hidden
						id='listId'
						name='listId'
						value={listId}
					/>
					<input
						readOnly
						hidden
						id='boardId'
						name='boardId'
						value={params.boardId}
					/>
					<div className='flex items-center gap-x-1'>
						<FormSubmit>Add card</FormSubmit>
						<Button
							ref={closeRef}
							onClick={disableEditing}
							size='sm'
							variant='ghost'>
							<XIcon size={20} />
						</Button>
					</div>
				</form>
			)
		}
		return (
			<div className='px-2 pt-2'>
				<Button
					onClick={enableEditing}
					size='sm'
					variant='ghost'
					className='h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground'>
					<PlusIcon
						size={16}
						className='mr-2'
					/>
					Add a card
				</Button>
			</div>
		)
	}
)

CardForm.displayName = 'CardForm'
