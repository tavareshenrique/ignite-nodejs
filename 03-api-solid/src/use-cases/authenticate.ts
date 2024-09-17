import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { IUsersRepository } from '@/repositories/users-repository'

import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface IAuthenticateUseCaseRequest {
	email: string
	password: string
}

interface IAuthenticateUseCaseResponse {
	user: User
}

export class AuthenticateUseCase {
	constructor(private readonly userRepository: IUsersRepository) {}

	async execute({
		email,
		password,
	}: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = await compare(password, user.password_hash)

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		return {
			user,
		}
	}
}
