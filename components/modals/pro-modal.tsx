'use client'

import Image from 'next/image'
import { toast } from 'sonner'

import { stripeRedirect } from '@/actions/stripe-redirect'
import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export const ProModal = () => {
	const proModal = useProModal()

	const { execute, isLoading } = useAction(stripeRedirect, {
		onSuccess(data) {
			window.location.href = data
		},
		onError(error) {
			toast.error(error)
		}
	})

	const onClick = () => {
		execute({})
	}

	return (
		<Dialog
			open={proModal.isOpen}
			onOpenChange={proModal.onClose}>
			<DialogContent className='max-w-md overflow-hidden p-0'>
				<div className='relative flex aspect-video items-center justify-center'>
					<Image
						src='/hero.svg'
						alt='Hero'
						fill
						className='object-cover'
					/>
				</div>
				<div className='mx-auto space-y-6 p-6 text-neutral-700'>
					<h2 className='text-xl font-semibold'>Upgrade to Mello Pro today!</h2>
					<p className='text-xs font-semibold text-neutral-600'>
						Explore the best of Mello
					</p>
					<div className='pl-3'>
						<ul className='list-disc text-sm'>
							<li>Unlimited Boards</li>
							<li>Advanced Checklists</li>
							<li>Admin and Security Features</li>
							<li>And more!</li>
						</ul>
					</div>
					<Button
						onClick={onClick}
						disabled={isLoading}
						className='w-full'>
						Upgrade to Pro
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
