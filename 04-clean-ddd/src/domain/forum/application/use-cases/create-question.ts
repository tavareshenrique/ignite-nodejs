import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionUseCaseResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
  ) {}

  async execute({ authorId, content, title }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    await this.questionRepository.create(question)

    return {
      question,
    }
  }
}