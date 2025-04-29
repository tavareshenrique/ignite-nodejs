import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/prisma/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { QuestionFactory } from 'test/factories/make-question';
import { StudentFactory } from 'test/factories/make-student';

describe('Get question by slug (E2E)', () => {
  let app: INestApplication;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    studentFactory = moduleRef.get(StudentFactory);

    questionFactory = moduleRef.get(QuestionFactory);

    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /questions/:slug', async () => {
    const user = await studentFactory.makePrismaStudent();

    const accessToken = jwt.sign({
      sub: user.id.toString(),
    });

    await questionFactory.makePrismaQuestion({
      authorId: user.id,
      title: 'How to create a NestJS application?',
      slug: Slug.create('how-to-create-a-nestjs-application'),
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
