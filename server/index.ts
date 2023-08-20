import { ApolloServer } from 'apollo-server'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import getRecord from './src/util/getRecord'
import getRecords from './src/util/getRecords'
import execCommand from './src/util/execCommand'
import { type Prefecture, type PrefectureFilter, type PrefectureInput } from './src/@types/graphql'

(async () => {
  const schema = loadSchemaSync('./schema.graphql', {
    loaders: [new GraphQLFileLoader()]
  })

  const resolvers = {
    Query: {
      prefectures: async (_: unknown, args: { filter: PrefectureFilter }): Promise<Prefecture[]> => {
        const prefectures = await getRecords<Prefecture[]>(
          'SELECT * FROM prefectures WHERE active = 1'
        )
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
      createPrefecture: async (_: unknown, args: { input: PrefectureInput }): Promise<Prefecture> => {
        const input = args.input
        const maxPrefectureId = (await getRecord<{ max_prefecture_id: number }>(
          'SELECT MAX(id) AS max_prefecture_id FROM prefectures'
        )).max_prefecture_id
        const prefecture: Prefecture = {
          id: maxPrefectureId + 1,
          name: input.name,
          capital: input.capital,
          population: input.population,
          area: input.area
        }
        await execCommand('INSERT INTO prefectures (id, name, capital, population, area) VALUES (?, ?, ?, ?, ?)', [prefecture.id, prefecture.name, prefecture.capital, prefecture.population, prefecture.area])
        return prefecture
      },
      updatePrefecture: async (_: unknown, args: { id: number, input: PrefectureInput }): Promise<Prefecture> => {
        const id = args.id
        const input = args.input
        const prefecture = await getRecord<Prefecture>('SELECT * FROM prefectures WHERE id = ?', [id])
        if (prefecture == null) {
          throw new Error(`Prefecture with id ${id} not found.`)
        }
        prefecture.name = input.name
        prefecture.capital = input.capital
        prefecture.population = input.population
        prefecture.area = input.area
        await execCommand('UPDATE prefectures SET name = ?, capital = ?, population = ?, area = ? WHERE id = ? AND active = 1', [prefecture.name, prefecture.capital, prefecture.population, prefecture.area, prefecture.id])
        return prefecture
      },
      deletePrefecture: async (_: unknown, args: { id: number }): Promise<Prefecture> => {
        const id = args.id
        const prefecture = await getRecord<Prefecture>('SELECT * FROM prefectures WHERE id = ? AND active = 1', [id])
        if (prefecture == null) {
          throw new Error(`Prefecture with id ${id} not found.`)
        }
        await execCommand('UPDATE prefectures SET active = 0 WHERE id = ?', [prefecture.id])
        return prefecture
      }
    }
  }

  const schemaWithResolvers = addResolversToSchema({ schema, resolvers })
  const server = new ApolloServer({ schema: schemaWithResolvers })

  const { url } = await server.listen(
    { port: 8000 }
  )
  console.log(`🚀 Server ready at ${url}`)
})()
  .then(() => {
    console.log('Run server successfully.')
  })
  .catch((err) => {
    console.error(err)
  })
