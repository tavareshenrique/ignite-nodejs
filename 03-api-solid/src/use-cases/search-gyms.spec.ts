import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
	beforeEach(async () => {
		gymsRepository = new InMemoryGymsRepository()

		sut = new SearchGymsUseCase(gymsRepository)
	})

	it('should be to search for gyms', async () => {
		await gymsRepository.create({
			name: 'JavaScript Gym',
			description: null,
			phone: null,
			latitude: -22.5906769,
			longitude: -42.9642715,
		})

		await gymsRepository.create({
			name: 'TypeScript Gym',
			description: null,
			phone: null,
			latitude: -22.5906769,
			longitude: -42.9642715,
		})

		const { gyms } = await sut.execute({
			query: 'JavaScript',
			page: 1,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ name: 'JavaScript Gym' })])
	})

	it('should be to fetch paginated gyms search', async () => {
		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				name: `JavaScript Gym ${i}`,
				description: null,
				phone: null,
				latitude: -22.5906769,
				longitude: -42.9642715,
			})
		}

		const { gyms } = await sut.execute({
			query: 'JavaScript',
			page: 2,
		})

		expect(gyms).toHaveLength(2)
		expect(gyms).toEqual([
			expect.objectContaining({ name: 'JavaScript Gym 21' }),
			expect.objectContaining({ name: 'JavaScript Gym 22' }),
		])
	})
})
