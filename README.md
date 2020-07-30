# Repo for https://github.com/nestjs/graphql/issues/1069

# Running

Start the app `npm run start:dev`, and hit the graphql endpoint `POST localhost:3000/graphql` with the following body's:

```
{
    test
}
```
and
```
{
    test2
}
```

The `test` query will result in an error which will not be caught by the exception filter, however the `test2` query will correctly we caught by the exception filter.
