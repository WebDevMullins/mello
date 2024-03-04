import Link from 'next/link'

import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export const Navbar = () => {
	return (
		<div className='fixed top-0 flex h-14 w-full items-center border-b bg-background px-4 shadow-sm'>
			<div className='mx-auto flex w-full items-center justify-between md:max-w-screen-2xl'>
				<Logo />
				<div className='flex w-full items-center justify-between space-x-4 md:block md:w-auto'>
					{/* <ThemeToggle /> */}
					<Button
						size='sm'
						variant='outline'
						asChild>
						<Link href='/sign-in'>Login</Link>
					</Button>
					<Button
						size='sm'
						asChild>
						<Link href='/sign-up'>Get Mello for free</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
