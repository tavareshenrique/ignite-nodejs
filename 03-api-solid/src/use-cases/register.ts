import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

interface IRegisterUseCaseRequest {
	email: string
	name: string
	password: string
}

// D - Dependency Inversion Principle
export class RegisterUseCase {
	constructor(private usersRepository: any) {}

	async execute({ email, name, password }: IRegisterUseCaseRequest) {
		const password_hash = await hash(password, 6)

		const userWithSameEmail = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (userWithSameEmail) {
			throw new Error('User with same email already exists')
		}

		await this.usersRepository.create({
			email,
			name,
			password_hash,
		})
	}
}
