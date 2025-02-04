import { expect, test } from "vitest"
import { AnswerQuestion } from "./answer-question"

test("create an answer", () => {
  const answerQuestion = new AnswerQuestion()

  const answer = answerQuestion.execute({
    content: "Nova Resposta",
    instructorId: "123",
    questionId: "123"
  })

  expect(answer.content).toEqual("Nova Resposta")
})