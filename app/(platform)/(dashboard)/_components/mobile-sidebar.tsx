'use client'

import { MenuIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'

import Sidebar from './sidebar'

const MobileSidebar = () => {
	const pathname = usePathname()
	const [isMounted, setIsMounted] = useState(false)

	const onOpen = useMobileSidebar((state) => state.onOpen)
	const onClose = useMobileSidebar((state) => state.onClose)
	const isOpen = useMobileSidebar((state) => state.isOpen)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		onClose()
	}, [pathname, onClose])

	if (!isMounted) return null

	return (
		<>
			<Button
				onClick={onOpen}
				className='mr-2 block md:hidden'
				variant='ghost'
				size='sm'>
				<MenuIcon size={16} />
			</Button>
			<Sheet
				open={isOpen}
				onOpenChange={onClose}>
				<SheetContent
					side='left'
					className='p-2 pt-10'>
					<Sidebar storageKey='mello-mobile-sidebar-state' />
				</SheetContent>
			</Sheet>
		</>
	)
}
export default MobileSidebar
