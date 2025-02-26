import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswersRepository {

  public items: Answer[] = []

  async findById(answerId: string): Promise<Answer | null> {
    const answer = this.items.find((answer) => answer.id.toString() === answerId)

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)

    if (answerIndex === -1) {
      throw new Error('Answer not found')
    }

    this.items[answerIndex] = answer
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)

    if (answerIndex === -1) {
      throw new Error('Answer not found')
    }

    this.items.splice(answerIndex, 1)
  }
}