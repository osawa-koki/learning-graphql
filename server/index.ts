import { ApolloServer } from 'apollo-server'
import getRecords from './src/util/getRecords'
import type Prefecture from './src/@types/prefecture'
import type PrefectureFilter from './src/@types/prefectureFilter'
import type PrefectureInput from './src/@types/prefectureInput'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import path from 'path'

(async () => {
  const schema = loadSchemaSync(path.join(__dirname, './schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });

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

  const schemaWithResolvers = addResolversToSchema({ schema, resolvers });
  const server = new ApolloServer({ schema: schemaWithResolvers });

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
