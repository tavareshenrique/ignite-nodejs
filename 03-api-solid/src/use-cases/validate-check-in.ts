import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

import { ICheckInsRepository } from '@/repositories/check-ins-repository'

import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IValidateCheckInUseCaseRequest {
	checkInId: string
}

interface IValidateCheckInUseCaseResponse {
	checkIn: CheckIn
}

export class ValidateCheckInUseCase {
	constructor(private readonly checkInsRepository: ICheckInsRepository) {}

	async execute({
		checkInId,
	}: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
		const checkIn = await this.checkInsRepository.findById(checkInId)

		if (!checkIn) {
			throw new ResourceNotFoundError()
		}

		const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.created_at,
			'minutes',
		)

		if (distanceInMinutesFromCheckInCreation > 20) {
			throw new LateCheckInValidationError()
		}

		checkIn.validated_at = new Date()

		const validateCheckIn = await this.checkInsRepository.save(checkIn)

		return {
			checkIn: validateCheckIn,
		}
	}
}
