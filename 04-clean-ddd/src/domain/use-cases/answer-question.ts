import { Answer } from "../entities/answer";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestion {
  execute({ content, instructorId, questionId }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content, 
      authorId: instructorId, 
      questionId
    });

    return answer;
  }
}