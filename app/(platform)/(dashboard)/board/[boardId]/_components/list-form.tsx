'use client'

import { PlusIcon, XIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { createList } from '@/actions/create-list'
import { useAction } from '@/hooks/use-action'

import FormInput from '@/components/form/form-input'
import FormSubmit from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'

import { ListWrapper } from './list-wrapper'

export const ListForm = () => {
	const router = useRouter()
	const params = useParams()

	const [isEditing, setIsEditing] = useState(false)

	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			inputRef.current?.focus()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const { execute, fieldErrors } = useAction(createList, {
		onSuccess(data) {
			toast.success(`List "${data.title}" created.`)
			disableEditing()
			router.refresh()
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

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef, disableEditing)

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const boardId = formData.get('boardId') as string

		execute({
			title,
			boardId
		})
	}

	if (isEditing) {
		return (
			<ListWrapper>
				<form
					action={onSubmit}
					ref={formRef}
					className='w-full space-y-4 rounded-md bg-white p-3 shadow-md'>
					<FormInput
						ref={inputRef}
						errors={fieldErrors}
						id='title'
						className='h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input'
						placeholder='Enter list title'
					/>
					<input
						hidden
						readOnly
						value={params.boardId}
						name='boardId'
					/>
					<div className='flex items-center justify-between'>
						<FormSubmit>Add list</FormSubmit>
						<Button
							onClick={disableEditing}
							size='sm'
							variant='ghost'>
							<XIcon
								size={16}
								className='mr-1'
							/>
							Cancel
						</Button>
					</div>
				</form>
			</ListWrapper>
		)
	}

	return (
		<ListWrapper>
			<button
				onClick={enableEditing}
				className='flex w-full items-center rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50'>
				<PlusIcon
					size={16}
					className='mr-2'
				/>
				Add a List
			</button>
		</ListWrapper>
	)
}
