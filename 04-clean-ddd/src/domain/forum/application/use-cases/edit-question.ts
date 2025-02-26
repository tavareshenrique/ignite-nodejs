import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

export class EditQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
  ) {}

  async execute({ authorId, questionId, content, title }: EditQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('You are not allowed to edit this question')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)
  }
}