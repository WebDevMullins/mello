'use client'

import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'

import { ListWithCards } from '@/types'

import { ListForm } from './list-form'
import { ListItem } from './list-item'

interface ListContainerProps {
	boardId: string
	data: ListWithCards[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)
	return result
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
	const [orderedData, setOrderedData] = useState(data)

	useEffect(() => {
		setOrderedData(data)
	}, [data])

	const onDragEnd = (result: any) => {
		const { source, destination, type } = result

		if (!destination) return

		// if dropped in the same list
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return

		// if list is moved
		if (type === 'list') {
			const items = reorder(orderedData, source.index, destination.index).map(
				(item, index) => {
					return {
						...item,
						order: index
					}
				}
			)
			setOrderedData(items)
			// TODO: update the order in the database
		}

		// if card is moved
		if (type === 'card') {
			let newOrderedData = [...orderedData]

			// get the source and destination lists
			const sourceList = newOrderedData.find(
				(list) => list.id === source.droppableId
			)
			const destinationList = newOrderedData.find(
				(list) => list.id === destination.droppableId
			)

			if (!sourceList || !destinationList) return

			// check if cards exists on the sourceList
			if (!sourceList.cards) {
				sourceList.cards = []
			}

			// check if cards exists on the destinationList
			if (!destinationList.cards) {
				destinationList.cards = []
			}

			// move card in the same list
			if (source.droppableId === destination.droppableId) {
				const reorderedCards = reorder(
					sourceList.cards,
					source.index,
					destination.index
				)

				reorderedCards.forEach((card, index) => {
					card.order = index
				})

				sourceList.cards = reorderedCards

				setOrderedData(newOrderedData)
				// TODO: update the order in the database

				// move card to another list
			} else {
				// remove card from source list
				const [movedCard] = sourceList.cards.splice(source.index, 1)

				// assign the new listId to the moved card
				movedCard.listId = destination.droppableId

				// add the card to the destination list
				destinationList.cards.splice(destination.index, 0, movedCard)

				// update the order of the cards in the source list
				sourceList.cards.forEach((card, index) => {
					card.order = index
				})

				// update the order of the cards in the destination list
				destinationList.cards.forEach((card, index) => {
					card.order = index
				})

				setOrderedData(newOrderedData)
				// TODO: update the order in the database
			}
		}
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable
				droppableId='lists'
				type='list'
				direction='horizontal'>
				{(provided) => (
					<ol
						{...provided.droppableProps}
						ref={provided.innerRef}
						className='flex h-full gap-x-3'>
						{orderedData.map((list, index) => {
							return (
								<ListItem
									key={list.id}
									index={index}
									data={list}
								/>
							)
						})}
						{provided.placeholder}
						<ListForm />
						<div className='w-1 flex-shrink-0' />
					</ol>
				)}
			</Droppable>
		</DragDropContext>
	)
}
