import { Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CustomException } from '../main';

@Module({
  imports: [],
  providers: [
    {
      provide: 'CONNECTION',
      scope: Scope.REQUEST,
      inject: [REQUEST],
      useFactory: async (request: Request) => {
        console.log('connectionFactory - useFactory - 1');

        // Does not call the CustomExceptionFilter
        throw new CustomException();
      },
    },
  ],
  exports: ['CONNECTION'],
})
export class ConnectionModule {}
