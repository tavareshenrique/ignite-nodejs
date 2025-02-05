import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestion {
  constructor(
    private answersRepository: AnswersRepository
  ) {}

  async execute({ content, instructorId, questionId }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content, 
      authorId: instructorId, 
      questionId
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}