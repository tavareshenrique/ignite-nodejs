import { faker } from '@faker-js/faker'
import { Prisma, User } from '@prisma/client'

import { IUsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements IUsersRepository {
	public items: User[] = []

	async findById(id: string) {
		const user = this.items.find((user) => user.id === id)

		if (!user) {
			return null
		}

		return user
	}

	async findByEmail(email: string) {
		const user = this.items.find((user) => user.email === email)

		if (!user) {
			return null
		}

		return user
	}

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: faker.string.uuid(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date(),
		}

		this.items.push(user)

		return user
	}
}
