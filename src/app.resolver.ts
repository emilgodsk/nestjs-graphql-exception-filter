import { Query, Resolver } from '@nestjs/graphql';
import { HttpException, Inject } from '@nestjs/common';
import { CustomException } from './main';

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
