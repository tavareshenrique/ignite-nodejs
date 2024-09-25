import { Gym } from '@prisma/client'

import { IGymsRepository } from '@/repositories/gyms-repository'

interface ICreateGymUseCaseRequest {
	name: string
	description: string | null
	phone: string | null
	latitude: number
	longitude: number
}

interface ICreateGymUseCaseResponse {
	gym: Gym
}

export class CreateGymUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute({
		description,
		latitude,
		longitude,
		name,
		phone,
	}: ICreateGymUseCaseRequest): Promise<ICreateGymUseCaseResponse> {
		const gym = await this.gymsRepository.create({
			description,
			latitude,
			longitude,
			name,
			phone,
		})

		return {
			gym,
		}
	}
}
