import {
  Catch, HttpException,
  Inject,
  Module,
  Scope,
} from '@nestjs/common';
import { NestFactory, REQUEST } from '@nestjs/core';
import { GqlExceptionFilter, GraphQLModule, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

// SAME AS THE ALL THE OTHER FILES. JUST IN ONE SINGLE FILE.

@Resolver('App')
export class AppResolver {
  constructor(
    @Inject('CONNECTION')
    private readonly connection
  ) {}

  @Query(() => Boolean)
  public test(): boolean {
    return true;
  }
}

@Resolver('App2')
export class App2Resolver {
  @Query(() => Boolean)
  public test2(): boolean {
    // Correctly calls the CustomExceptionFilter
    throw new CustomException();

    return true;
  }
}

@Module({
  imports: [],
  providers: [
    {
      provide: 'CONNECTION',
      scope: Scope.REQUEST,
      inject: [REQUEST],
      useFactory: async (request: Request) => {
        console.log('connectionFactory - useFactory - 1');
        throw new CustomException();
      },
    },
  ],
  exports: ['CONNECTION'],
})
export class ConnectionModule {}

@Module({
  imports: [
    ConnectionModule,
    GraphQLModule.forRootAsync({
      useFactory: () => {
        return {
          autoSchemaFile: 'schema.gql',
          context: ({ req }): any => ({ req }),
          debug: true,
        };
      },
    }),
  ],
  providers: [AppResolver],
})
export class AppModule {}

export class CustomException extends Error {
  constructor() {
    super('CUSTOM EXCEPTION');
  }
}

@Catch(CustomException)
export class CustomExceptionFilter implements GqlExceptionFilter {
  public catch(): any {
    console.log('not being called');

    return new Error('custom error');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3000);
}
bootstrap();
