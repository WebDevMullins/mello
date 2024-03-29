import { auth } from '@clerk/nextjs'
import { HelpCircleIcon, User2Icon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { MAX_FREE_BOARDS } from '@/constants/boards'
import { db } from '@/lib/db'
import { getAvailableCount } from '@/lib/org-limit'
import { checkSubscription } from '@/lib/subscription'

import FormPopover from '@/components/form/form-popover'
import Hint from '@/components/hint'
import { Skeleton } from '@/components/ui/skeleton'

const BoardList = async () => {
	const { orgId } = auth()

	if (!orgId) {
		return redirect('/select-org')
	}

	const boards = await db.board.findMany({
		where: {
			orgId
		},
		orderBy: {
			createdAt: 'desc'
		}
	})

	const availableCount = await getAvailableCount()

	const isPro = await checkSubscription()

	return (
		<div className='space-y-4'>
			<div className='flex items-center text-lg font-semibold'>
				<User2Icon
					size={24}
					className='mr-2'
				/>
				Your Boards
			</div>
			<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
				{boards.map((board) => (
					<Link
						key={board.id}
						href={`/board/${board.id}`}
						className='group relative aspect-video h-full w-full overflow-hidden rounded-sm bg-cover bg-center bg-no-repeat p-2'
						style={{ backgroundImage: `url(${board.imageThumbUrl})` }}>
						<div className='absolute inset-0 bg-black/30 transition group-hover:bg-black/40' />
						<p className='relative font-semibold text-white'>{board.title}</p>
					</Link>
				))}
				<FormPopover
					side='bottom'
					sideOffset={-290}
					align='center'
					alignOffset={0}>
					<div
						role='button'
						className='relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75'>
						<p className='text-sm'>Create new board</p>
						<span className='text-xs'>
							{isPro
								? 'Unlimited'
								: `${MAX_FREE_BOARDS - availableCount} remaining`}
						</span>
						<Hint
							sideOffset={40}
							description={`
					Free Workspaces can have up to 1 open board. For unlimited boards upgrade this workspace.
					`}>
							<HelpCircleIcon className='absolute bottom-2 right-2 h-[14px] w-[14px]' />
						</Hint>
					</div>
				</FormPopover>
			</div>
		</div>
	)
}
export default BoardList

BoardList.Skeleton = function SkeletonBoardList() {
	return (
		<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
		</div>
	)
}
