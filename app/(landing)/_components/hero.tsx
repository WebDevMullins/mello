import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const Hero = () => {
	return (
		<section className='flex h-dvh flex-col items-center justify-center gap-y-8 px-4 md:py-20'>
				<div className='flex flex-col items-center justify-center gap-y-6'>
					<h1 className='text-pretty text-center text-3xl font-medium capitalize md:text-6xl'>
						Helping teams move
					</h1>
					<div className='w-fit rounded-md bg-gradient-to-tr from-[#364266] to-[#cd95b4] p-2 px-4 text-3xl font-medium capitalize text-white md:text-5xl'>
						work forward
					</div>
				</div>
				<div className='mx-auto mt-4 max-w-xs text-center text-sm text-primary/60 md:max-w-2xl md:text-xl'>
					Collaborate, manage projects, and reach new productivity peaks. From
					high rises to the home office, the way your team works is unique -
					accomplish it all with Mello.
				</div>
				<Button
					size='lg'
					variant='default'>
					<Link href='/sign-up'>Get Mello for free</Link>
				</Button>
				<div className='flex max-w-6xl items-center justify-center'>
					<div className='mx-auto flex px-2 sm:max-w-4xl md:max-w-screen-xl'>
						<div className='rounded-xl border lg:rounded-2xl'>
							<Image
								className='rounded-xl shadow-2xl lg:rounded-2xl'
								src='/images/organization.png'
								alt='Dashboard Image'
								height={695}
								width={2000}
							/>
						</div>
					</div>
				</div>
			</section>
	)
}
export default Hero