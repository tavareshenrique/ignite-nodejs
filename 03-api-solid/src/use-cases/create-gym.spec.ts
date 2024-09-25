import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()

		sut = new CreateGymUseCase(gymsRepository)
	})

	it('should be able to register', async () => {
		const { gym } = await sut.execute({
			name: 'John Doe',
			description: null,
			phone: null,
			latitude: -22.5906769,
			longitude: -42.9642715,
		})

		expect(gym.id).toEqual(expect.any(String))
	})
})
