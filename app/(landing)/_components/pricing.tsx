import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Pricing = () => {
	return (
		<section
			id='pricing'
			className='flex items-center justify-center pb-24 md:py-32'>
			<div className='container mx-auto flex w-full flex-col items-center justify-center px-4 pb-20 pt-16 md:pb-0 lg:px-20'>
				<span className='mb-2 text-sm font-semibold uppercase text-[#cd95b4]'>Pricing</span>
				<span className='text-center text-4xl font-bold'>
					Manage your projects today!
				</span>
				<div className='grid grid-cols-1 md:grid-cols-2 md:gap-8'>
					<div className='relative mx-auto mt-16 flex max-w-3xl flex-col items-center gap-8 sm:mt-20 md:flex-row md:items-stretch'>
						<span className='absolute -inset-6 rotate-3 scale-x-[-1] rounded-3xl bg-gradient-to-r from-[#364266] to-[#cd95b4] opacity-30 blur-3xl'></span>
						<div className='relative z-20 flex w-[300px] flex-col gap-5 rounded-xl bg-background p-5'>
							<div className='flex items-center justify-between gap-4'>
								<p className='text-lg font-medium'>Basic Plan</p>
							</div>
							<div className='flex gap-2'>
								<p className='text-5xl font-bold tracking-tight text-[#cd95b4]'>
									Free
								</p>
							</div>
							<ul className='flex-1 space-y-2.5 text-sm leading-relaxed'>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Manage 1 Project</span>
								</li>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Competitive Analysis</span>
								</li>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Product Names</span>
								</li>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Suggested Features</span>
								</li>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Color Palette</span>
								</li>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Typography</span>
								</li>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Database Models</span>
								</li>
							</ul>
							<div className='space-y-2'>
								<div className='w-full'>
									<Link href='/sign-up'>
										<Button className='w-full' variant='outline'>Sign in to Start</Button>
									</Link>
								</div>
								<p className='text-base-content-secondary/80 text-center text-xs font-medium'>
									Free. No subscription
								</p>
							</div>
						</div>
					</div>
					<div className='relative mx-auto mt-16 flex max-w-3xl flex-col items-center gap-8 sm:mt-20 md:flex-row md:items-stretch'>
						<span className='absolute -inset-6 rotate-3 scale-x-[-1] rounded-3xl bg-gradient-to-r from-[#364266] to-[#cd95b4] opacity-30 blur-3xl'></span>
						<div className='relative z-20 flex w-[300px] flex-col gap-5 rounded-xl bg-background p-5'>
							<div className='flex items-center justify-between gap-4'>
								<p className='text-lg font-medium'>Premium Plan</p>
							</div>
							<div className='flex gap-2'>
								<p className='text-5xl font-bold tracking-tight text-[#cd95b4]'>
									$5
								</p>
								<div className='mb-[3px] flex flex-col justify-end'>
									<p className='text-base-content-secondary/80 text-xs font-medium uppercase'>
										USD / Month
									</p>
								</div>
							</div>
							<ul className='flex-1 space-y-2.5 text-sm leading-relaxed'>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Manage Many Projects</span>
								</li>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Competitive Analysis</span>
								</li>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Product Names</span>
								</li>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Suggested Features</span>
								</li>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Icons &amp; Assets</span>
								</li>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Color Palette</span>
								</li>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Typography</span>
								</li>
								<li className='flex items-center gap-2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='text-base-content-secondary/80 h-4 w-4'>
										<path
											fill-rule='evenodd'
											d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
											clip-rule='evenodd'></path>
									</svg>
									<span>Database Models</span>
								</li>
							</ul>
							<div className='space-y-2'>
								<div className='w-full'>
									<Link href='/sign-up'>
									<Button className='w-full' variant='secondary'>
										Upgrade Now
									</Button>
									</Link>
								</div>
								<p className='text-base-content-secondary/80 text-center text-xs font-medium'>
									Billed Monthly
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Pricing
