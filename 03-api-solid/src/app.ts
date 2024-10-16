import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from './env'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { userRoutes } from './http/controllers/users/routes'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

app.register(gymsRoutes)
app.register(userRoutes)

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error.',
			issues: error.format(),
		})
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error)
	} else {
		// TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry/Airbrake
	}

	return reply.status(500).send({
		message: 'Internal server error.',
	})
})
