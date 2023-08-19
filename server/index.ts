import { ApolloServer, gql } from 'apollo-server'
import getRecords from './src/util/getRecords'
import type Prefecture from './src/@types/prefecture'
import type PrefectureFilter from './src/@types/prefectureFilter'
import type PrefectureInput from './src/@types/prefectureInput'

(async () => {
  const typeDefs = gql`
    type Query {
      prefectures(filter: PrefectureFilter): [Prefecture]
    }

    type Mutation {
      createPrefecture(input: PrefectureInput): Prefecture
    }

    type Prefecture {
      id: Int!
      name: String!
      capital: String!
      population: Int!
      area: Float!
    }

    input PrefectureInput {
      name: String!
      capital: String!
      population: Int!
      area: Float!
    }

    input PrefectureFilter {
      id: Int
      name: String
      capital: String
      populationMin: Int
      populationMax: Int
      areaMin: Float
      areaMax: Float
    }
  `

  const prefectures: Prefecture[] = await getRecords('./db/db.sqlite3', 'SELECT * FROM prefectures')

  const resolvers = {
    Query: {
      prefectures: (_: unknown, args: { filter: PrefectureFilter }): Prefecture[] => {
        const filter = args.filter
        if (filter == null) {
          return prefectures
        }
        return prefectures.filter((prefecture) => {
          if (filter.id != null && prefecture.id !== filter.id) {
            return false
          }
          if (filter.name != null && !prefecture.name.includes(filter.name)) {
            return false
          }
          if (filter.capital != null && !prefecture.capital.includes(filter.capital)) {
            return false
          }
          if (filter.populationMin != null && prefecture.population < filter.populationMin) {
            return false
          }
          if (filter.populationMax != null && prefecture.population > filter.populationMax) {
            return false
          }
          if (filter.areaMin != null && prefecture.area < filter.areaMin) {
            return false
          }
          if (filter.areaMax != null && prefecture.area > filter.areaMax) {
            return false
          }
          return true
        })
      }
    },
    Mutation: {
      createPrefecture: (_: unknown, args: { input: PrefectureInput }): Prefecture => {
        const input = args.input
        const prefecture: Prefecture = {
          id: prefectures.length + 1,
          name: input.name,
          capital: input.capital,
          population: input.population,
          area: input.area
        }
        prefectures.push(prefecture)
        return prefecture
      }
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
