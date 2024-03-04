'use client'

import { AuditLog } from '@prisma/client'
import { ActivityIcon } from 'lucide-react'

import { ActivityItem } from '@/components/activity-item'
import { Skeleton } from '@/components/ui/skeleton'

interface ActivityProps {
	items: AuditLog[]
}

export const Activity = ({ items }: ActivityProps) => {
	return (
		<div className='flex w-full items-start gap-x-3'>
			<ActivityIcon
				size={20}
				className='mt-0.5'
			/>
			<div className='w-full'>
				<p className='mb-2 font-semibold'>Activity</p>
				<ol className='mt-2 space-y-4'>
					{items.map((item) => (
						<ActivityItem
							key={item.id}
							data={item}
						/>
					))}
				</ol>
			</div>
		</div>
	)
}

Activity.Skeleton = function ActivitySkeleton() {
	return (
		<div className='flex w-full items-start gap-x-3'>
			<Skeleton className='h-6 w-6 bg-primary-foreground' />
			<div className='w-full'>
				<Skeleton className='mb-2 h-6 w-24 bg-primary-foreground' />
				<Skeleton className='h-10 w-full bg-primary-foreground' />
			</div>
		</div>
	)
}
