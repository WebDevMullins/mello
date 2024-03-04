'use client'

import { CheckIcon, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

import { defaultImages } from '@/constants/images'
import { unsplash } from '@/lib/unsplash'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import FormErrors from './form-errors'

interface FormPickerProps {
	id: string
	errors?: Record<string, string[] | undefined>
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
	const { pending } = useFormStatus()

	const [images, setImages] =
		useState<Array<Record<string, any>>>(defaultImages)
	const [isLoading, setIsLoading] = useState(true)
	const [selectedImage, setSelectedImage] = useState(null)

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const result = await unsplash.photos.getRandom({
					collectionIds: ['317099'],
					count: 9
				})

				if (result && result.response) {
					const returnedImages = result.response as Array<Record<string, any>>
					setImages(returnedImages)
				} else {
					console.error('No images returned')
				}
			} catch (error) {
				console.error(error)
				setImages(defaultImages)
			} finally {
				setIsLoading(false)
			}
		}
		fetchImages()
	}, [])

	if (isLoading)
		return (
			<div className='flex justify-center p-6'>
				<Loader2Icon
					size={24}
					className='animate-spin'
				/>
			</div>
		)

	return (
		<div className='relative'>
			<div className='mb-2 grid grid-cols-3 gap-2'>
				{images.map((image) => (
					<div
						key={image.id}
						className={cn(
							'group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75',
							pending && 'cursor-auto opacity-50 hover:opacity-50'
						)}
						onClick={() => {
							if (pending) return
							setSelectedImage(image.id)
						}}>
						<input
							type='radio'
							id={id}
							name={id}
							className='hidden'
							checked={selectedImage === image.id}
							disabled={pending}
							value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
						/>
						<Image
							fill
							src={image.urls.thumb}
							alt='Unsplash Image'
							className='rounded-sm object-cover'
						/>
						{selectedImage === image.id && (
							<div className='absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/30'>
								<CheckIcon
									size={16}
									className='text-white'
								/>
							</div>
						)}
						<Link
							href={image.links.html}
							target='_blank'
							className='absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100'>
							{image.user.name}
						</Link>
					</div>
				))}
			</div>
			<FormErrors
				id='image'
				errors={errors}
			/>
		</div>
	)
}
export default FormPicker
