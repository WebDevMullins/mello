import { MedalIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

const LandingPage = () => {
	return (
		<main className='flex min-h-screen flex-col items-center p-24'>
			<div className='flex flex-col items-center justify-center'>
				<div className='mb-4 flex items-center rounded-full border bg-amber-400 p-4 uppercase text-amber-700 shadow-sm'>
					<MedalIcon className='mr-2 h-6 w-6' />
					#1 task managment
				</div>
				<h1 className='mb-6 text-center text-3xl text-neutral-800 md:text-6xl'>
					Mello helps teams move
				</h1>
				<div className='w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 text-3xl text-white md:text-6xl'>
					work forward.
				</div>
			</div>
			<div className='mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl'>
				Collaborate, manage projects, and reach new productivity peaks. From
				high rises to the home office, the way your team works is unique -
				accomplish it all with Mello.
			</div>
			<Button
				className='mt-6'
				size='lg'>
				<Link href='/sign-up'>Get Mello for free</Link>
			</Button>
		</main>
	)
}

export default LandingPage
