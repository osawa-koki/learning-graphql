import React, { useState } from 'react'
import { Alert, Spinner, Table } from 'react-bootstrap'
import { ApolloProvider, type OperationVariables, Query, type QueryResult } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { gql } from '@apollo/react-hooks'
import setting from '../setting'
import PrefectureFilter from '../components/PrefectureFilter'
import { type Prefecture } from '../src/gql/graphql'

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${setting.apiPath}/graphql`
  }),
  cache: new InMemoryCache()
})

export default function ListPage (): React.JSX.Element {
  const [filterId, setFilterId] = useState<number | null>(null)
  const [filterName, setFilterName] = useState<string | null>(null)
  const [filterCapital, setFilterCapital] = useState<string | null>(null)
  const [filterPopulationMin, setFilterPopulationMin] = useState<number | null>(null)
  const [filterPopulationMax, setFilterPopulationMax] = useState<number | null>(null)
  const [filterAreaMin, setFilterAreaMin] = useState<number | null>(null)
  const [filterAreaMax, setFilterAreaMax] = useState<number | null>(null)

  const query = gql`
    query($filterId: Int, $filterName: String, $filterCapital: String, $filterPopulationMin: Int, $filterPopulationMax: Int, $filterAreaMin: Float, $filterAreaMax: Float) {
      prefectures(filter: {
        id: $filterId,
        name: $filterName,
        capital: $filterCapital,
        populationMin: $filterPopulationMin,
        populationMax: $filterPopulationMax,
        areaMin: $filterAreaMin,
        areaMax: $filterAreaMax
      }
    ) {
      id
      name
      capital
      population
      area
    }
  }
  `

  return (
    <>
      <h2>
        Prefectures&nbsp;
        <span role="img" aria-label="Rocket">🚀</span>
      </h2>
      <PrefectureFilter
        filterId={filterId}
        setFilterId={setFilterId}
        filterName={filterName}
        setFilterName={setFilterName}
        filterCapital={filterCapital}
        setFilterCapital={setFilterCapital}
        filterPopulationMin={filterPopulationMin}
        setFilterPopulationMin={setFilterPopulationMin}
        filterPopulationMax={filterPopulationMax}
        setFilterPopulationMax={setFilterPopulationMax}
        filterAreaMin={filterAreaMin}
        setFilterAreaMin={setFilterAreaMin}
        filterAreaMax={filterAreaMax}
        setFilterAreaMax={setFilterAreaMax}
      />
      <ApolloProvider client={client}>
        <Query query={query} variables={
          {
            filterId: filterId != null ? Number(filterId) : null,
            filterName,
            filterCapital,
            filterPopulationMin,
            filterPopulationMax,
            filterAreaMin,
            filterAreaMax
          }
        }>
        {
          (result: QueryResult<
          {
            prefectures: Prefecture[]
          }, OperationVariables
          >) => {
            if (result.error != null) {
              return (
              <Alert variant='danger' className='mt-3'>
                {result.error.message}
              </Alert>
              )
            }
            if (result.loading || result.data == null) {
              return (
              <div className='mt-3 d-flex align-items-center'>
                <Spinner animation="border" role="status" className='me-3' />
                <span>Loading...</span>
              </div>
              )
            }
            return (
              <>
                <Table className='mt-3'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Capital</th>
                      <th>Population</th>
                      <th>Area</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.data.prefectures.map((prefecture, index) => (
                      <tr key={index}>
                        <td>{prefecture.id}</td>
                        <td>{prefecture.name}</td>
                        <td>{prefecture.capital}</td>
                        <td>{prefecture.population}</td>
                        <td>{prefecture.area}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )
          }
        }
      </Query>
      </ApolloProvider>
    </>
  )
}
