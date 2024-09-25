import { CheckIn } from '@prisma/client'

import { ICheckInsRepository } from '@/repositories/check-ins-repository'
import { IGymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
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
		userLatitude,
		userLongitude,
	}: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
		const gym = await this.gymsRepository.findById(gymId)

		if (!gym) {
			throw new ResourceNotFoundError()
		}

		const distance = getDistanceBetweenCoordinates(
			{ latitude: userLatitude, longitude: userLongitude },
			{
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			},
		)

		const MAX_DISTANCE_IN_KILOMETERS = 0.1

		if (distance > MAX_DISTANCE_IN_KILOMETERS) {
			throw new MaxDistanceError()
		}

		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		)

		if (checkInOnSameDay) {
			throw new MaxNumberOfCheckInsError()
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
