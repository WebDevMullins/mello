import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { PlusIcon } from 'lucide-react'

import FormPopover from '@/components/form/form-popover'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

import MobileSidebar from './mobile-sidebar'

const Navbar = () => {
	return (
		<nav className='fixed top-0 z-50 flex h-14 w-full items-center border-b bg-background px-4 shadow-sm'>
			<MobileSidebar />
			<div className='flex items-center gap-x-4'>
				<div className='hidden md:flex'>
					<Logo />
				</div>
				<FormPopover
					align='start'
					side='bottom'
					sideOffset={18}>
					<Button
						size='sm'
						className='hidden h-auto px-2 py-1.5 md:flex'>
						<PlusIcon
							size={16}
							className='mr-2'
						/>
						Create Board
					</Button>
				</FormPopover>
				<FormPopover>
					<Button
						size='icon'
						variant='outline'
						className='md:hidden'>
						<PlusIcon size={16} />
					</Button>
				</FormPopover>
			</div>
			<div className='items-cetner ml-auto flex gap-x-2'>
				<ThemeToggle />
				<div className='hidden md:flex'>
					<OrganizationSwitcher
						hidePersonal
						afterCreateOrganizationUrl='/organization/:id'
						afterLeaveOrganizationUrl='/select-org'
						afterSelectOrganizationUrl='/organization/:id'
						appearance={{
							elements: {
								rootBox: {
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}
							}
						}}
					/>
				</div>
				<UserButton
					afterSignOutUrl='/'
					appearance={{
						elements: {
							avatarBox: {
								height: 30,
								width: 30
							}
						}
					}}
				/>
			</div>
		</nav>
	)
}
export default Navbar
