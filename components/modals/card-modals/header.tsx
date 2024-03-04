'use client'

import { useQueryClient } from '@tanstack/react-query'
import { LayoutIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'

import { CardWithList } from '@/types'

import { updateCard } from '@/actions/update-card'
import FormInput from '@/components/form/form-input'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'

interface HeaderProps {
	data: CardWithList
}

export const Header = ({ data }: HeaderProps) => {
	const queryClient = useQueryClient()
	const params = useParams()

	const { execute } = useAction(updateCard, {
		onSuccess(data) {
			queryClient.invalidateQueries({
				queryKey: ['card', data.id]
			})

			queryClient.invalidateQueries({
				queryKey: ['card-logs', data.id]
			})

			toast.success(`Card renamed to ${data.title}`)

			setTitle(data.title)
		},
		onError(error) {
			toast.error(error)
		}
	})

	const inputRef = useRef<ElementRef<'input'>>(null)

	const [title, setTitle] = useState(data.title)

	const onBlur = () => {
		inputRef.current?.form?.requestSubmit()
	}

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const boardId = params.boardId as string

		if (title === data.title) return

		execute({
			id: data.id,
			boardId,
			title
		})
	}

	return (
		<div className='mb-6 flex w-full items-start gap-x-3'>
			<LayoutIcon size={24} />
			<div className='w-full'>
				<form action={onSubmit}>
					<FormInput
						ref={inputRef}
						onBlur={onBlur}
						id='title'
						defaultValue={title}
						className='relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent bg-transparent px-1 text-xl font-semibold focus-visible:border-input focus-visible:bg-primary'
					/>
				</form>
				<p className='text-sm text-muted-foreground'>
					in list{' '}
					<span className='capitalize underline'>{data.list.title}</span>
				</p>
			</div>
		</div>
	)
}

Header.Skeleton = function HeaderSkeleton() {
	return (
		<div className='mb-6 flex w-full items-start gap-x-3'>
			<Skeleton className='mt-1 h-6 w-6 bg-primary-foreground' />
			<div>
				<Skeleton className='mb-1 h-6 w-24 bg-primary-foreground' />
				<Skeleton className='h-4 w-12 bg-primary-foreground' />
			</div>
		</div>
	)
}
