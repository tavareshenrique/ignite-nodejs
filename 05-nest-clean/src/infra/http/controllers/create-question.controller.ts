import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { z } from 'zod';

import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '../pipes/zod-validation';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()).optional(),
});

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content, attachments } = body;
    const userId = user.sub;

    const result = await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: attachments ?? [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
