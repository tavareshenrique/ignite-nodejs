import { Prisma, Comment as PrismaComment } from '@prisma/client';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class PrismaQuestionCommentMapper {
  static toDomain(raw: PrismaComment): QuestionComment {
    if (!raw.questionId) {
      throw new Error('Invalid comment type');
    }

    return QuestionComment.create(
      {
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        questionId: new UniqueEntityId(raw.questionId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(
    answerComment: QuestionComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
      questionId: answerComment.questionId.toString(),
      content: answerComment.content,
      createdAt: answerComment.createdAt,
      updatedAt: answerComment.updatedAt ?? undefined,
    };
  }
}
