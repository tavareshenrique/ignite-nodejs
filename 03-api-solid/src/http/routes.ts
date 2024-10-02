import { FastifyInstance } from 'fastify'

import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { register } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
	app.post('/users', register)

	app.post('/session', authenticate)

	/** Authenticated Bellow */
	app.get('/me', profile)
}
