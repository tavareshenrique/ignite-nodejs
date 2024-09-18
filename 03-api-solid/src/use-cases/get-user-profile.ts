import { User } from '@prisma/client'

import { IUsersRepository } from '@/repositories/users-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IGetUserProfileRequest {
	userId: string
}

interface IGetUserProfileResponse {
	user: User
}

export class GetUserProfileUseCase {
	constructor(private readonly userRepository: IUsersRepository) {}

	async execute({
		userId,
	}: IGetUserProfileRequest): Promise<IGetUserProfileResponse> {
		const user = await this.userRepository.findById(userId)

		if (!user) {
			throw new ResourceNotFoundError()
		}

		return {
			user,
		}
	}
}
