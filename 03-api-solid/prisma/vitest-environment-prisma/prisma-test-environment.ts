import 'dotenv/config'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import { Environment } from 'vitest/environments'

import { prisma } from '@/lib/prisma'

function generateDatabaseURL(schema: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not set')
	}

	const url = new URL(process.env.DATABASE_URL)

	url.searchParams.set('schema', schema)

	return url.toString()
}

export default <Environment>{
	name: 'prisma',
	transformMode: 'ssr',
	async setup() {
		const schema = randomUUID()

		process.env.DATABASE_URL = generateDatabaseURL(schema)

		execSync('npx prisma migrate deploy')

		return {
			teardown: async () => {
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
				)

				await prisma.$disconnect()
			},
		}
	},
}
