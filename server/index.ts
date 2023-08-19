import { ApolloServer, gql } from 'apollo-server'

// スキーマを定義する
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crishton'
  }
]

const resolvers = {
  Query: {
    books: () => books
  }
}

// サーバーを起動する
const server = new ApolloServer({ typeDefs, resolvers })

server.listen(
  { port: 8000 }
)
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error(`❌ Server error: ${err.message}\n${err.stack as string}`)
    } else {
      console.error(`❌ Server error: ${err as string}`)
    }
  })
