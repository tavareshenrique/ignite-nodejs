import { afterEach } from 'node:test'

import { Decimal } from '@prisma/client/runtime/library'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository()
		gymsRepository = new InMemoryGymsRepository()

		sut = new CheckInUseCase(checkInsRepository, gymsRepository)

		gymsRepository.items.push({
			id: 'gym-01',
			name: 'Gym JS',
			description: 'Description',
			latitude: new Decimal(-22.5906769),
			longitude: new Decimal(-42.9642715),
			phone: '',
		})

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to check in', async () => {
		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-id',
			userLatitude: -22.5906769,
			userLongitude: -42.9642715,
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-id',
			userLatitude: -22.5906769,
			userLongitude: -42.9642715,
		})

		await expect(
			sut.execute({
				gymId: 'gym-01',
				userId: 'user-id',
				userLatitude: -22.5906769,
				userLongitude: -42.9642715,
			}),
		).rejects.toBeInstanceOf(Error)
	})

	it('should be able to check in twice but in different days', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-id',
			userLatitude: -22.5906769,
			userLongitude: -42.9642715,
		})

		vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-id',
			userLatitude: -22.5906769,
			userLongitude: -42.9642715,
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check in on distant gym', async () => {
		gymsRepository.items.push({
			id: 'gym-02',
			name: 'Gym JS New',
			description: 'Description',
			latitude: new Decimal(-22.5133057),
			longitude: new Decimal(-43.1693313),
			phone: '',
		})

		await expect(
			sut.execute({
				gymId: 'gym-02',
				userId: 'user-id',
				userLatitude: -22.5906769,
				userLongitude: -42.9642715,
			}),
		).rejects.toBeInstanceOf(Error)
	})
})
