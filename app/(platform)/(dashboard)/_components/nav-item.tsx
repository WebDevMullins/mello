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
					'flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline',
					isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
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
			<AccordionContent className='pt-1 text-neutral-700'>
				{routes.map((route) => (
					<Button
						key={route.label}
						size='sm'
						onClick={() => onClick(route.href)}
						className={cn(
							'mb-1 w-full justify-start pl-10 font-normal',
							pathname === route.href && 'bg-sky-500/10 text-sky-700'
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
export default NavItem
