import { OrganizationProfile } from '@clerk/nextjs'

const SettingsPage = () => {
	return (
		<div className='w-full md:w-fit'>
			<OrganizationProfile
				appearance={{
					elements: {
						rootBox: {
							boxShadow: 'none',
							width: '100%'
						},
						card: {
							border: '1px solid',
							boxShadow: 'none',
							width: '100%'
						}
					}
				}}
			/>
		</div>
	)
}
export default SettingsPage
