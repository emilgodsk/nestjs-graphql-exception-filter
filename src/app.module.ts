import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConnectionModule } from './connection/connection.module';
import { App2Resolver, AppResolver } from './app.resolver';

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
  providers: [AppResolver, App2Resolver],
})
export class AppModule {}
