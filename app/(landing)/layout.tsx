import { Footer } from './_components/footer'
import { Navbar } from './_components/navbar'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col justify-center'>
			<Navbar />
			<main className='flex h-full flex-col'>{children}</main>
			<Footer />
		</div>
	)
}

export default LandingLayout
