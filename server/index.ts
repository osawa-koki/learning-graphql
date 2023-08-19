import { ApolloServer, gql } from 'apollo-server'
import getRecords from './src/util/getRecords'
import Prefecture from './src/@types/prefecture'

(async () => {
  const typeDefs = gql`
    type Query {
      prefectures(filter: prefectureInput): [Prefecture]
    }

    type Prefecture {
      id: ID!
      name: String!
      capital: String!
      population: Int!
      area: Float!
    }

    input prefectureInput {
      id: ID
      name: String
      capital: String
      population: Int
      area: Float
    }
  `

  const prefectures: Prefecture[] = await getRecords('./db/db.sqlite3', 'SELECT * FROM prefectures')

  const resolvers = {
    Query: {
      prefectures: () => prefectures
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
})()
  .then(() => {
    console.log('done')
  })
  .catch((err) => {
    console.error(err)
  })
