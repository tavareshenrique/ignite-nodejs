import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
	beforeEach(async () => {
		gymsRepository = new InMemoryGymsRepository()

		sut = new FetchNearbyGymsUseCase(gymsRepository)
	})

	it('should be to fetch nearby gyms', async () => {
		await gymsRepository.create({
			name: 'Near Gym',
			description: null,
			phone: null,
			latitude: -22.5906769,
			longitude: -42.9642715,
		})

		await gymsRepository.create({
			name: 'Far Gym',
			description: null,
			phone: null,
			latitude: -22.5133057,
			longitude: -43.1693313,
		})

		const { gyms } = await sut.execute({
			userLatitude: -22.5906769,
			userLongitude: -42.9642715,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ name: 'Near Gym' })])
	})
})
