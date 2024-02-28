import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { PlusIcon } from 'lucide-react'

import FormPopover from '@/components/form/form-popover'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

import MobileSidebar from './mobile-sidebar'

const Navbar = () => {
	return (
		<nav className='fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm'>
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
						className='rouded-sm hidden h-auto px-2 py-1.5 md:block'>
						Create
					</Button>
				</FormPopover>
				<FormPopover>
					<Button
						size='sm'
						className='block rounded-sm md:hidden'>
						<PlusIcon className='h-4 w-4' />
					</Button>
				</FormPopover>
			</div>
			<div className='items-cetner ml-auto flex gap-x-2'>
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
