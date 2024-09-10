import { hash } from 'bcryptjs'

import { IUserRepository } from '@/repositories/users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface IRegisterUseCaseRequest {
	email: string
	name: string
	password: string
}

// D - Dependency Inversion Principle
export class RegisterUseCase {
	constructor(private usersRepository: IUserRepository) {}

	async execute({ email, name, password }: IRegisterUseCaseRequest) {
		const password_hash = await hash(password, 6)

		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError()
		}

		await this.usersRepository.create({
			email,
			name,
			password_hash,
		})
	}
}
