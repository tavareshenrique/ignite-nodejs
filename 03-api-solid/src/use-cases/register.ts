import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

interface IRegisterUseCaseRequest {
	email: string
	name: string
	password: string
}

export async function registerUseCase({
	email,
	name,
	password,
}: IRegisterUseCaseRequest) {
	const password_hash = await hash(password, 6)

	const userWithSameEmail = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	if (userWithSameEmail) {
		throw new Error('User with same email already exists')
	}

	await prisma.user.create({
		data: {
			email,
			name,
			password_hash,
		},
	})
}
