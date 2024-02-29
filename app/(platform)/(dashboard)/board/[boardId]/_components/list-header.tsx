'use client'

import { List } from '@prisma/client'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'

import { updateList } from '@/actions/update-list'
import { useAction } from '@/hooks/use-action'

import FormInput from '@/components/form/form-input'

import { ListOptions } from './list-options'

interface ListHeaderProps {
	data: List
}

export const ListHeader = ({ data }: ListHeaderProps) => {
	const [title, setTitle] = useState(data.title)
	const [isEditing, setIsEditing] = useState(false)

	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			inputRef.current?.focus()
			inputRef.current?.select()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const { execute, fieldErrors } = useAction(updateList, {
		onSuccess: (data) => {
			toast.success(`List title updated to ${data.title}`)
			setTitle(data.title)
			disableEditing()
		},
		onError(error) {
			toast.error(error)
		}
	})

	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			formRef.current?.requestSubmit()
		}
	}

	useEventListener('keydown', onKeydown)

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		if (title === data.title) {
			return disableEditing()
		}

		execute({
			title,
			id: data.id,
			boardId
		})
	}

	const onBlur = () => {
		formRef.current?.requestSubmit()
	}

	return (
		<div className='flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold'>
			{isEditing ? (
				<form
					action={onSubmit}
					ref={formRef}
					className='flex-1 px-[2px]'>
					<input
						hidden
						readOnly
						id='id'
						name='id'
						value={data.id}
					/>
					<input
						hidden
						readOnly
						id='boardId'
						name='boardId'
						value={data.boardId}
					/>
					<FormInput
						ref={inputRef}
						errors={fieldErrors}
						onBlur={onBlur}
						id='title'
						defaultValue={title}
						placeholder='Enter list title'
						className='h-7 w-full truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition focus-within:bg-white hover:border-input focus:border-input'
					/>
					<button
						type='submit'
						hidden></button>
				</form>
			) : (
				<div
					onClick={enableEditing}
					className='h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium'>
					{title}
				</div>
			)}
			<ListOptions
				data={data}
				onAddCard={() => {}}
			/>
		</div>
	)
}
