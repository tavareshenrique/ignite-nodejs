import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, object>

interface DeleteQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
}

export class DeleteQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
  ) {}

  async execute({ questionId, authorId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionRepository.delete(question)

    return right({})
  }
}