'use client'

import { List } from '@prisma/client'
import {
	CopyIcon,
	MoreHorizontalIcon,
	PlusIcon,
	Trash2Icon,
	XIcon
} from 'lucide-react'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

import { deleteList } from '@/actions/delete-list'
import { useAction } from '@/hooks/use-action'

import { copyList } from '@/actions/copy-list'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

interface ListOptionsProps {
	data: List
	onAddCard: () => void
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
	const closeRef = useRef<ElementRef<'button'>>(null)

	const { execute: executeDelete } = useAction(deleteList, {
		onSuccess(data) {
			toast.success(`List "${data.title}" deleted`)
			closeRef.current?.click()
		},
		onError(error) {
			toast.error(error)
		}
	})

	const { execute: executeCopy } = useAction(copyList, {
		onSuccess(data) {
			toast.success(`List "${data.title}" copied`)
			closeRef.current?.click()
		},
		onError(error) {
			toast.error(error)
		}
	})

	const onDelete = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		executeDelete({ id, boardId })
	}

	const onCopy = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		executeCopy({ id, boardId })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className='h-auto- w-auto p-2'
					variant='ghost'>
					<MoreHorizontalIcon size={16} />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='px-0 py-3'
				side='bottom'
				align='start'>
				<div className='pb-4 text-center text-sm font-medium'>List Actions</div>
				<PopoverClose
					ref={closeRef}
					asChild>
					<Button
						className='absolute right-2 top-2 h-auto w-auto p-2'
						variant='ghost'>
						<XIcon size={16} />
					</Button>
				</PopoverClose>
				<Button
					onClick={onAddCard}
					className='h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal'
					variant='ghost'>
					<PlusIcon
						size={16}
						className='mr-2'
					/>
					Add Card
				</Button>
				<form action={onCopy}>
					<input
						hidden
						readOnly
						name='id'
						id='id'
						value={data.id}
					/>
					<input
						hidden
						readOnly
						name='boardId'
						id='boardId'
						value={data.boardId}
					/>
					<FormSubmit
						className='h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal'
						variant='ghost'>
						<CopyIcon
							size={16}
							className='mr-2'
						/>
						Copy List
					</FormSubmit>
				</form>
				<Separator />
				<form action={onDelete}>
					<input
						hidden
						readOnly
						name='id'
						id='id'
						value={data.id}
					/>
					<input
						hidden
						readOnly
						name='boardId'
						id='boardId'
						value={data.boardId}
					/>
					<FormSubmit
						className='h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal text-destructive hover:bg-destructive/90'
						variant='ghost'>
						<Trash2Icon
							size={16}
							className='mr-2'
						/>
						Delete List
					</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}
