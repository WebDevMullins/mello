'use client'

import { useQueryClient } from '@tanstack/react-query'
import { AlignLeftIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { CardWithList } from '@/types'

import { updateCard } from '@/actions/update-card'
import { FormSubmit } from '@/components/form/form-submit'
import { FormTextarea } from '@/components/form/form-textarea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { toast } from 'sonner'

interface DescriptionProps {
	data: CardWithList
}

export const Description = ({ data }: DescriptionProps) => {
	const queryClient = useQueryClient()
	const params = useParams()

	const [isEditing, setIsEditing] = useState(false)

	const formRef = useRef<ElementRef<'form'>>(null)
	const textareaRef = useRef<ElementRef<'textarea'>>(null)

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			textareaRef.current?.focus()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing()
		}
	}

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef, disableEditing)

	const { execute, fieldErrors } = useAction(updateCard, {
		onSuccess(data) {
			queryClient.invalidateQueries({
				queryKey: ['card', data.id]
			})

			queryClient.invalidateQueries({
				queryKey: ['card-logs', data.id]
			})

			toast.success(`Card ${data.title} updated`)
			disableEditing()
		},
		onError(error) {
			toast.error(error)
		}
	})

	const onSubmit = (formData: FormData) => {
		const description = formData.get('description') as string
		const boardId = params.boardId as string

		execute({
			boardId,
			id: data.id,
			description
		})
	}
	return (
		<div className='flex w-full items-start gap-x-3'>
			<AlignLeftIcon
				size={20}
				className='mt-0.5'
			/>
			<div className='w-full'>
				<p className='mb-2 font-semibold'>Description</p>
				{isEditing ? (
					<form
						action={onSubmit}
						ref={formRef}
						className='space-y-2'>
						<FormTextarea
							ref={textareaRef}
							id='description'
							className='mt-2 w-full'
							placeholder='Add a description...'
							defaultValue={data.description || undefined}
							errors={fieldErrors}
						/>
						<div className='flex items-center gap-x-2'>
							<FormSubmit>Save</FormSubmit>
							<Button
								type='button'
								onClick={disableEditing}
								size='sm'
								variant='ghost'>
								Cancel
							</Button>
						</div>
					</form>
				) : (
					<div
						role='button'
						onClick={enableEditing}
						className='min-h-[78px] rounded-md bg-primary-foreground px-3.5 py-3 text-sm font-medium'>
						{data.description || 'Add a description...'}
					</div>
				)}
			</div>
		</div>
	)
}

Description.Skeleton = function DescriptionSkeleton() {
	return (
		<div className='flex w-full items-start gap-x-3'>
			<Skeleton className='h-6 w-6 bg-primary-foreground' />
			<div className='w-full'>
				<Skeleton className='mb-2 h-6 w-24 bg-primary-foreground' />
				<Skeleton className='h-[78px] w-full bg-primary-foreground' />
			</div>
		</div>
	)
}
