import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
}

export class DeleteQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
  ) {}

  async execute({ questionId, authorId }: DeleteQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('You are not allowed to delete this question')
    }

    await this.questionRepository.delete(question)
  }
}