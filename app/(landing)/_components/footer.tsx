import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

export const Footer = () => {
	return (
		<footer className='flex flex-col w-full border-t bg-background p-4'>
			<div className='mx-auto flex w-full items-center justify-between md:max-w-screen-2xl'>
				<Logo />
				<div className='flex w-full items-center justify-between space-x-4 md:block md:w-auto'>
					<Button
						size='sm'
						variant='ghost'>
						Privacy Policy
					</Button>
					<Button
						size='sm'
						variant='ghost'>
						Terms of Service
					</Button>
				</div>
			</div>
		</footer>
	)
}
