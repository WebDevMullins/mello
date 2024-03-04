'use client'

import { MoreHorizontalIcon, Trash2Icon, XIcon } from 'lucide-react'
import { toast } from 'sonner'

import { deleteBoard } from '@/actions/delete-board'
import { useAction } from '@/hooks/use-action'

import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

interface BoardOptionsProps {
	id: string
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
	const { execute, isLoading } = useAction(deleteBoard, {
		onComplete() {
			toast.success('Board deleted')
		},
		onError(error) {
			toast.error(error)
		}
	})

	const onDelete = () => {
		execute({ id })
	}
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='transparent'
					className='h-auto w-auto p-2'>
					<MoreHorizontalIcon size={16} />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='px-0 py-3'
				side='bottom'
				align='start'>
				<div className='pb-4 text-center text-sm font-medium text-neutral-600'>
					Board Actions
				</div>
				<PopoverClose asChild>
					<Button
						variant='ghost'
						className='absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600'>
						<XIcon size={16} />
					</Button>
				</PopoverClose>
				<Button
					variant='ghost'
					onClick={onDelete}
					disabled={isLoading}
					className='h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal text-destructive hover:bg-destructive/90'>
					<Trash2Icon
						size={16}
						className='mr-2'
					/>
					Delete Board
				</Button>
			</PopoverContent>
		</Popover>
	)
}
