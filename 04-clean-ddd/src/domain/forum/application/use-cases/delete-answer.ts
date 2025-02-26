import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

export class DeleteAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
  ) {}

  async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<void> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('You are not allowed to delete this answer')
    }

    await this.answerRepository.delete(answer)
  }
}