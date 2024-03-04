import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
	return (
		<Link href='/'>
			<div className='hidden items-center gap-x-2 transition hover:opacity-75 md:flex'>
				<Image
					src='/logo.png'
					alt='Logo'
					height={30}
					width={30}
				/>
				<p className='text-xl text-primary'>Mello</p>
			</div>
		</Link>
	)
}
