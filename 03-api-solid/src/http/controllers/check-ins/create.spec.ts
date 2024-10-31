import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Check-in (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to create a check-in', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const gym = await prisma.gym.create({
			data: {
				name: 'JS Gym',
				description: 'A melhor academia da cidade',
				phone: '11999999999',
				latitude: -23.123456,
				longitude: -46.654321,
			},
		})

		const response = await request(app.server)
			.post(`/gyms/${gym.id}/check-ins`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				latitude: -23.123456,
				longitude: -46.654321,
			})

		expect(response.statusCode).toEqual(201)
	})
})
