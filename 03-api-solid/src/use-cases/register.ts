import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { IUsersRepository } from '@/repositories/users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface IRegisterUseCaseRequest {
	email: string
	name: string
	password: string
}

interface IRegisterUseCaseResponse {
	user: User
}

// D - Dependency Inversion Principle
export class RegisterUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({
		email,
		name,
		password,
	}: IRegisterUseCaseRequest): Promise<IRegisterUseCaseResponse> {
		const password_hash = await hash(password, 6)

		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError()
		}

		const user = await this.usersRepository.create({
			email,
			name,
			password_hash,
		})

		return {
			user,
		}
	}
}
