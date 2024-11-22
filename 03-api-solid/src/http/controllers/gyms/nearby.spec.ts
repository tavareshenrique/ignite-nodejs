import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to list nearby gyms', async () => {
		const { token } = await createAndAuthenticateUser(app, true)

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'JS Gym',
				description: 'A melhor academia da cidade',
				phone: '11999999999',
				latitude: -22.5906769,
				longitude: -42.9642715,
			})

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'TS Gym',
				description: 'A melhor academia da cidade',
				phone: '11999999999',
				latitude: -22.5133057,
				longitude: -43.1693313,
			})

		const response = await request(app.server)
			.get('/gyms/nearby')
			.query({
				latitude: -22.5906769,
				longitude: -42.9642715,
			})
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.gyms).toHaveLength(1)
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				name: 'JS Gym',
			}),
		])
	})
})
