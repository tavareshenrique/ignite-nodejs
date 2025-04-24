import { UsePipes } from '@nestjs/common';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validation';
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
export class CreateAccountController {
  constructor(private registerStudent: RegisterStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = createAccountBodySchema.parse(body);

    const result = await this.registerStudent.execute({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      throw new Error('Error creating account');
    }
  }
}
