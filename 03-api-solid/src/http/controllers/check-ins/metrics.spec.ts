import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Check-in Metrics (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to list the get total count of check-ins', async () => {
		const { token } = await createAndAuthenticateUser(app)

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

		await prisma.checkIn.createMany({
			data: [
				{
					gym_id: gym.id,
					user_id: user.id,
				},
				{
					gym_id: gym.id,
					user_id: user.id,
				},
			],
		})

		const response = await request(app.server)
			.get('/check-ins/metrics')
			.set('Authorization', `Bearer ${token}`)
			.send({
				latitude: -23.123456,
				longitude: -46.654321,
			})

		expect(response.statusCode).toEqual(200)
		expect(response.body.checkInsCount).toEqual(2)
	})
})
