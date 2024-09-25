import { Gym } from '@prisma/client'

import { IGymsRepository } from '@/repositories/gyms-repository'

interface ISearchGymsUseCaseRequest {
	query: string
	page: number
}

interface ISearchGymsUseCaseResponse {
	gyms: Gym[]
}

export class SearchGymsUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute({
		page,
		query,
	}: ISearchGymsUseCaseRequest): Promise<ISearchGymsUseCaseResponse> {
		const gyms = await this.gymsRepository.searchMany(query, page)

		return {
			gyms,
		}
	}
}
