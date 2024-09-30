import { CheckIn } from '@prisma/client'

import { ICheckInsRepository } from '@/repositories/check-ins-repository'

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

		checkIn.validated_at = new Date()

		const validateCheckIn = await this.checkInsRepository.save(checkIn)

		return {
			checkIn: validateCheckIn,
		}
	}
}
