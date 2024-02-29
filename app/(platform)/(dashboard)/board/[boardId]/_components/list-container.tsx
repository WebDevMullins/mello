'use client'

import { ListWithCards } from '@/types'
import { List } from '@prisma/client'
import { useEffect, useState } from 'react'

import { ListForm } from './list-form'
import { ListItem } from './list-item'

interface ListContainerProps {
	boardId: string
	data: ListWithCards[]
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
	const [orderedData, setOrderedData] = useState(data)

	useEffect(() => {
		setOrderedData(data)
	}, [data])
	return (
		<ol className='flex h-full gap-x-3'>
			{orderedData.map((list, index) => {
				return (
					<ListItem
						key={list.id}
						index={index}
						data={list}
					/>
				)
			})}
			<ListForm />
			<div className='w-1 flex-shrink-0' />
		</ol>
	)
}
