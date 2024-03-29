'use server'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'

import { CreateList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized'
		}
	}

	const { title, boardId } = data
	let list

	try {
		const board = await db.board.findFirst({
			where: {
				id: boardId,
				orgId
			}
		})

		if (!board) {
			return {
				error: 'Board not found.'
			}
		}

		const lastList = await db.list.findFirst({
			where: { boardId },
			orderBy: { order: 'desc' },
			select: { order: true }
		})

		list = await db.list.create({
			data: {
				title,
				boardId,
				order: lastList ? lastList.order + 1 : 1
			}
		})
		await createAuditLog({
			entityTitle: list.title,
			entityId: list.id,
			entityType: ENTITY_TYPE.LIST,
			action: ACTION.CREATE
		})
	} catch (error) {
		return {
			error: 'Failed to create list.'
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: list }
}

export const createList = createSafeAction(CreateList, handler)
