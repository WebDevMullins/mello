import { Footer } from './_components/footer'
import { Navbar } from './_components/navbar'

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='h-full'>
			<Navbar />
			<main className='pb-20 pt-40'>{children}</main>
			<Footer />
		</div>
	)
}

export default LandingLayout
