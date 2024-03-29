'use client'

import {
	ActivityIcon,
	CreditCardIcon,
	LayoutIcon,
	SettingsIcon
} from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export type Organization = {
	id: string
	slug: string
	imageUrl: string
	name: string
}

interface NavItemProps {
	isActive: boolean
	isExpanded: boolean
	organization: Organization
	onExpand: (id: string) => void
}

const NavItem = ({
	isActive,
	isExpanded,
	organization,
	onExpand
}: NavItemProps) => {
	const router = useRouter()
	const pathname = usePathname()

	const routes = [
		{
			label: 'Boards',
			icon: (
				<LayoutIcon
					size={16}
					className='mr-2'
				/>
			),
			href: `/organization/${organization.id}`
		},
		{
			label: 'Activity',
			icon: (
				<ActivityIcon
					size={16}
					className='mr-2'
				/>
			),
			href: `/organization/${organization.id}/activity`
		},
		{
			label: 'Settings',
			icon: (
				<SettingsIcon
					size={16}
					className='mr-2'
				/>
			),
			href: `/organization/${organization.id}/settings`
		},
		{
			label: 'Billing',
			icon: (
				<CreditCardIcon
					size={16}
					className='mr-2'
				/>
			),
			href: `/organization/${organization.id}/billing`
		}
	]

	const onClick = (href: string) => {
		router.push(href)
	}

	return (
		<AccordionItem
			value={organization.id}
			className='border-none'>
			<AccordionTrigger
				onClick={() => onExpand(organization.id)}
				className={cn(
					'flex items-center gap-x-2 rounded-md p-1.5 text-start text-muted-foreground no-underline transition hover:bg-primary/10 hover:no-underline',
					isActive && !isExpanded && 'bg-primary/10 font-medium text-primary'
				)}>
				<div className='flex items-center gap-x-2'>
					<div className='relative h-7 w-7'>
						<Image
							fill
							src={organization.imageUrl}
							alt={organization.name}
							className='rounded-sm object-cover'
						/>
					</div>
					<span className='text-sm font-medium'>{organization.name}</span>
				</div>
			</AccordionTrigger>
			<AccordionContent className='pt-1 text-primary'>
				{routes.map((route) => (
					<Button
						key={route.label}
						size='sm'
						onClick={() => onClick(route.href)}
						className={cn(
							'mb-1 w-full justify-start pl-10 font-normal text-muted-foreground',
							pathname === route.href &&
								'bg-primary/10 font-medium text-primary'
						)}
						variant='ghost'>
						{route.icon}
						{route.label}
					</Button>
				))}
			</AccordionContent>
		</AccordionItem>
	)
}

NavItem.Skeleton = function SkeletonNavItem() {
	return (
		<div className='flex items-center gap-x-2'>
			<div className='relative h-10 w-10 shrink-0'>
				<Skeleton className='absolute h-full w-full' />
			</div>
			<Skeleton className='h-10 w-full' />
		</div>
	)
}
export default NavItem
