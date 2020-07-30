import { Catch } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { AppModule } from './app.module';
import { ApolloError} from 'apollo-server';

export class CustomException extends Error {
  constructor() {
    super('CUSTOM EXCEPTION');
  }
}

@Catch(CustomException)
export class CustomExceptionFilter implements GqlExceptionFilter {
  public catch(): any {
    console.log('not being called from request scoped exception');

    return new ApolloError('test', 'TEST_MESSAGE');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3000);
}
bootstrap();
