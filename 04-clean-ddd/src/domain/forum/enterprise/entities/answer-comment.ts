import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Comment, CommentProps } from './comment'

export interface AnswerCommentProps extends CommentProps {
  authorId: UniqueEntityId
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.authorId
  }

  static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: UniqueEntityId) {
    const answerComment = new AnswerComment({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id)

    return answerComment
  }
}