'use server'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { hasAvailableCount, incrementAvailableCount } from '@/lib/org-limit'
import { checkSubscription } from '@/lib/subscription'

import { CreateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'User not authenticated'
		}
	}

	const canCreateBoard = await hasAvailableCount()

	const isPro = await checkSubscription()

	if (!canCreateBoard && !isPro) {
		return {
			error:
				'You have reached the maximum number of free boards. Please upgrade your plan to create more boards.'
		}
	}

	const { title, image } = data

	const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
		image.split('|')

	if (
		!imageId ||
		!imageThumbUrl ||
		!imageFullUrl ||
		!imageLinkHTML ||
		!imageUserName
	) {
		return {
			error: 'Invalid image data'
		}
	}

	let board

	try {
		board = await db.board.create({
			data: {
				title,
				orgId,
				imageId,
				imageThumbUrl,
				imageFullUrl,
				imageLinkHTML,
				imageUserName
			}
		})

		if (!isPro) {
			await incrementAvailableCount()
		}

		await createAuditLog({
			entityTitle: board.title,
			entityId: board.id,
			entityType: ENTITY_TYPE.BOARD,
			action: ACTION.CREATE
		})
	} catch (error) {
		return {
			error: 'Failed to create board'
		}
	}
	revalidatePath(`/board/${board.id}`)
	return {
		data: board
	}
}

export const createBoard = createSafeAction(CreateBoard, handler)
