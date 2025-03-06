import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findById(questionId: string): Promise<Question | null> {
    const question = this.items.find((question) => question.id.toString() === questionId)

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find((question) => question.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex((item) => item.id === question.id)

    if (questionIndex === -1) {
      throw new Error('Question not found')
    }

    this.items[questionIndex] = question
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex((item) => item.id === question.id)

    if (questionIndex === -1) {
      throw new Error('Question not found')
    }

    this.items.splice(questionIndex, 1)
  }
}