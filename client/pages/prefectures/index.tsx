import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Alert, Spinner, Table } from 'react-bootstrap'
import { gql } from 'apollo-boost'
import { ApolloProvider, type OperationVariables, Query, type QueryResult } from 'react-apollo'

import PrefectureFilter from '../../components/PrefectureFilter'
import { type Prefecture } from '../../src/gql/graphql'
import apolloClient from '../../src/apolloClient'

export default function PrefectureIndexPage (): React.JSX.Element {
  const router = useRouter()

  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  const [filterId, setFilterId] = useState<number | null>(null)
  const [filterName, setFilterName] = useState<string | null>(null)
  const [filterCapital, setFilterCapital] = useState<string | null>(null)
  const [filterPopulationMin, setFilterPopulationMin] = useState<number | null>(null)
  const [filterPopulationMax, setFilterPopulationMax] = useState<number | null>(null)
  const [filterAreaMin, setFilterAreaMin] = useState<number | null>(null)
  const [filterAreaMax, setFilterAreaMax] = useState<number | null>(null)

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false)
      return
    }
    const query = router.query
    if (query.id != null) {
      setFilterId(Number(query.id))
    } else {
      setFilterId(null)
    }
    if (query.name != null) {
      setFilterName(String(query.name))
    } else {
      setFilterName(null)
    }
    if (query.capital != null) {
      setFilterCapital(String(query.capital))
    } else {
      setFilterCapital(null)
    }
    if (query.populationMin != null) {
      setFilterPopulationMin(Number(query.populationMin))
    } else {
      setFilterPopulationMin(null)
    }
    if (query.populationMax != null) {
      setFilterPopulationMax(Number(query.populationMax))
    } else {
      setFilterPopulationMax(null)
    }
    if (query.areaMin != null) {
      setFilterAreaMin(Number(query.areaMin))
    } else {
      setFilterAreaMin(null)
    }
    if (query.areaMax != null) {
      setFilterAreaMax(Number(query.areaMax))
    } else {
      setFilterAreaMax(null)
    }
  }, [router.query])

  useEffect(() => {
    if (firstLoad) {
      return
    }
    const newQuery: any = {}
    if (filterId != null && !Number.isNaN(filterId)) {
      newQuery.id = filterId
    }
    if (filterName != null && filterName !== '') {
      newQuery.name = filterName
    }
    if (filterCapital != null && filterCapital !== '') {
      newQuery.capital = filterCapital
    }
    if (filterPopulationMin != null && !Number.isNaN(filterPopulationMin)) {
      newQuery.populationMin = filterPopulationMin
    }
    if (filterPopulationMax != null && !Number.isNaN(filterPopulationMax)) {
      newQuery.populationMax = filterPopulationMax
    }
    if (filterAreaMin != null && !Number.isNaN(filterAreaMin)) {
      newQuery.areaMin = filterAreaMin
    }
    if (filterAreaMax != null && !Number.isNaN(filterAreaMax)) {
      newQuery.areaMax = filterAreaMax
    }
    router.push({
      pathname: '/prefectures',
      query: newQuery
    })
      .then(() => {})
      .catch((error) => {
        console.error(error)
      })
  }, [filterId, filterName, filterCapital, filterPopulationMin, filterPopulationMax, filterAreaMin, filterAreaMax])

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
        <span role='img' aria-label='Rocket'>🚀</span>
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
      <ApolloProvider client={apolloClient}>
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
                  <Spinner animation='border' role='status' className='me-3' />
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
