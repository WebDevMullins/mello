import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
	title: {
		default: 'Mello',
		template: `%s | Mello`
	},
	description:
		'Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with Mello.',
	icons: [
		{
			url: '/logo.png',
			href: '/logo.png'
		}
	]
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={`${poppins.className} bg-background text-primary`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
