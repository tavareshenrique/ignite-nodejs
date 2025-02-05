import { expect, test } from "vitest"
import { AnswerQuestion } from "./answer-question"
import { AnswersRepository } from "../repositories/answers-repository"
import { Answer } from "../entities/answer"

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return
  }
}

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestion(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    content: "Nova Resposta",
    instructorId: "123",
    questionId: "123"
  })

  expect(answer.content).toEqual("Nova Resposta")
})