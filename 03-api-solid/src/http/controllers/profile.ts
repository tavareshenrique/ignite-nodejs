import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
	await request.jwtVerify()

	console.log('User:', request.user.sub)

	return reply.status(200).send()
}
