'use server'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'

import { CreateCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized'
		}
	}

	const { title, boardId, listId } = data
	let card

	try {
		const list = await db.list.findFirst({
			where: {
				id: listId,
				board: {
					orgId
				}
			}
		})

		if (!list) {
			return {
				error: 'List not found.'
			}
		}

		const lastCard = await db.card.findFirst({
			where: { listId },
			orderBy: { order: 'desc' },
			select: { order: true }
		})

		card = await db.card.create({
			data: {
				title,
				listId,
				order: lastCard ? lastCard.order + 1 : 0
			}
		})

		await createAuditLog({
			entityId: card.id,
			entityType: ENTITY_TYPE.CARD,
			entityTitle: card.title,
			action: ACTION.CREATE
		})

		
	} catch (error) {
		return {
			error: 'Failed to create card.'
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: card }
}

export const createCard = createSafeAction(CreateCard, handler)
