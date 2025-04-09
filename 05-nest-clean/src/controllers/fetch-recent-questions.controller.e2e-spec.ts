import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Fetch recent questions (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      },
    });

    const accessToken = jwt.sign({
      sub: user.id,
    });

    await prisma.question.createMany({
      data: [
        {
          title: 'How to create a NestJS application?',
          slug: 'how-to-create-a-nestjs-application',
          content: 'I want to create a NestJS application. How can I do that?',
          authorId: user.id,
        },
        {
          title: 'How to use Prisma with NestJS?',
          slug: 'how-to-use-prisma-with-nestjs',
          content:
            'I want to use Prisma with my NestJS application. How can I do that?',
          authorId: user.id,
        },
      ],
    });

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({
          title: 'How to create a NestJS application?',
        }),
        expect.objectContaining({
          title: 'How to use Prisma with NestJS?',
        }),
      ],
    });
  });
});
