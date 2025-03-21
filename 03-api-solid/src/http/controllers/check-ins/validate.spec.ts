import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Validate Check-in (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to validate a check-in', async () => {
		const { token } = await createAndAuthenticateUser(app, true)

		const user = await prisma.user.findFirstOrThrow()

		const gym = await prisma.gym.create({
			data: {
				name: 'JS Gym',
				description: 'A melhor academia da cidade',
				phone: '11999999999',
				latitude: -23.123456,
				longitude: -46.654321,
			},
		})

		let checkIn = await prisma.checkIn.create({
			data: {
				gym_id: gym.id,
				user_id: user.id,
			},
		})

		const response = await request(app.server)
			.patch(`/check-ins/${checkIn.id}/validate`)
			.set('Authorization', `Bearer ${token}`)

		expect(response.statusCode).toEqual(204)

		checkIn = await prisma.checkIn.findUniqueOrThrow({
			where: {
				id: checkIn.id,
			},
		})

		expect(checkIn.validated_at).toEqual(expect.any(Date))
	})
})
