import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova Resposta',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0].id).toBe(answer.id)
  })
})