import { CheckIn } from '@prisma/client'

import { ICheckInsRepository } from '@/repositories/check-ins-repository'
import { IGymsRepository } from '@/repositories/gyms-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ICheckInUseCaseRequest {
	userId: string
	gymId: string
	userLatitude: number
	userLongitude: number
}

interface ICheckInUseCaseResponse {
	checkIn: CheckIn
}

export class CheckInUseCase {
	constructor(
		private readonly checkInsRepository: ICheckInsRepository,
		private gymsRepository: IGymsRepository,
	) {}

	async execute({
		gymId,
		userId,
	}: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
		const gym = await this.gymsRepository.findById(gymId)

		if (!gym) {
			throw new ResourceNotFoundError()
		}

		// TODO: Calculate distance between user and gym

		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		)

		if (checkInOnSameDay) {
			throw new Error('User already checked in today')
		}

		const checkIn = await this.checkInsRepository.create({
			gym_id: gymId,
			user_id: userId,
		})

		return {
			checkIn,
		}
	}
}
