import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Get question by slug (E2E)', () => {
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

  test('[GET] /questions/:slug', async () => {
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

    await prisma.question.create({
      data: {
        title: 'How to create a NestJS application?',
        slug: 'how-to-create-a-nestjs-application',
        content: 'I want to create a NestJS application. How can I do that?',
        authorId: user.id,
      },
    });

    const response = await request(app.getHttpServer())
      .get('/questions/how-to-create-a-nestjs-application')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      question: expect.objectContaining({
        title: 'How to create a NestJS application?',
      }),
    });
  });
});
