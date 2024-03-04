import { Footer } from './_components/footer'
import { Navbar } from './_components/navbar'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex h-full justify-center'>
			<Navbar />
			<main className='my-auto'>{children}</main>
			<Footer />
		</div>
	)
}

export default LandingLayout
