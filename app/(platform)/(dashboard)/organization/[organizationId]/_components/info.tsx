'use client'

import { useOrganization } from '@clerk/nextjs'
import { CreditCardIcon } from 'lucide-react'
import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'

interface InfoProps {
	isPro: boolean
}

const Info = ({ isPro }: InfoProps) => {
	const { organization, isLoaded } = useOrganization()

	if (!isLoaded) {
		return <Info.Skeleton />
	}

	return (
		<div className='flex items-center gap-x-4'>
			<div className='relative h-[60px] w-[60px]'>
				<Image
					fill
					src={organization?.imageUrl!}
					alt='Organization Image'
					className='rounded-md object-cover'
				/>
			</div>
			<div className='space-y-1'>
				<p className='text-xl font-semibold'>{organization?.name}</p>
				<div className='flex items-center text-xs text-muted-foreground'>
					<CreditCardIcon
						size={12}
						className='mr-1'
					/>
					{isPro ? 'Pro' : 'Free'}
				</div>
			</div>
		</div>
	)
}
export default Info

Info.Skeleton = function SkeletonInfo() {
	return (
		<div className='flex items-center gap-x-4'>
			<div className='relative h-[60px] w-[60px]'>
				<Skeleton className='absolute h-full w-full' />
			</div>
			<div className='space-y-2'>
				<Skeleton className='h-10 w-[200px]' />
				<div className='flex items-center'>
					<Skeleton className='mr-2 h-4 w-4' />
					<Skeleton className='h-4 w-[100px]' />
				</div>
			</div>
		</div>
	)
}
