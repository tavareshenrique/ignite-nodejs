import { ICheckInsRepository } from '@/repositories/check-ins-repository'

interface IGetUserMetricsUseCaseRequest {
	userId: string
}

interface IGetUserMetricsUseCaseResponse {
	checkInsCount: number
}

export class GetUserMetricsUseCase {
	constructor(private readonly checkInsRepository: ICheckInsRepository) {}

	async execute({
		userId,
	}: IGetUserMetricsUseCaseRequest): Promise<IGetUserMetricsUseCaseResponse> {
		const checkInsCount = await this.checkInsRepository.countByUserId(userId)

		return {
			checkInsCount,
		}
	}
}
