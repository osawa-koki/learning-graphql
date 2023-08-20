import React, { useMemo, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { gql } from 'apollo-boost'

import apolloClient from '../../src/apolloClient'

export default function PrefectureNewPage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [name, setName] = useState<string | null>(null)
  const [capital, setCapital] = useState<string | null>(null)
  const [population, setPopulation] = useState<number | null>(null)
  const [area, setArea] = useState<number | null>(null)

  const {
    isValid,
    errorReasons
  } = useMemo(
    () => {
      const errorReasons: string[] = []
      if (name == null) {
        errorReasons.push('Name is required.')
      }
      if (capital == null) {
        errorReasons.push('Capital is required.')
      }
      if (population == null) {
        errorReasons.push('Population is required.')
      }
      if (area == null) {
        errorReasons.push('Area is required.')
      }
      return {
        isValid: errorReasons.length === 0,
        errorReasons
      }
    },
    [name, capital, population, area],
  )


  const query = gql`
    mutation($input: PrefectureInput!) {
      createPrefecture(input: $input) {
        id
        name
        capital
        population
        area
      }
    }
  `

  const submit = async () => {
    setIsLoading(true)
    await apolloClient.mutate({
      mutation: query,
      variables: {
        input: {
          name,
          capital,
          population,
          area
        }
      }
    })
    setIsLoading(false)
  }

  return (
    <>
      <h1>New Prefecture</h1>
      <Form>
        <Form.Group controlId="name" className='mt-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name ?? ''}
            onChange={(e) => { setName(e.target.value !== '' ? e.target.value : null) }
          } />
        </Form.Group>
        <Form.Group controlId="capital" className='mt-3'>
          <Form.Label>Capital</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter capital"
            value={capital ?? ''}
            onChange={(e) => { setCapital(e.target.value !== '' ? e.target.value : null) }
          } />
        </Form.Group>
        <Form.Group controlId="population" className='mt-3'>
          <Form.Label>Population</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter population"
            value={population ?? ''}
            onChange={(e) => { setPopulation(e.target.value !== '' ? Number(e.target.value) : null) }
          } />
        </Form.Group>
        <Form.Group controlId="area" className='mt-3'>
          <Form.Label>Area</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter area"
            value={area ?? ''}
            onChange={(e) => { setArea(e.target.value !== '' ? Number(e.target.value) : null) }
          } />
        </Form.Group>
      </Form>
      <hr />
      <Button
        className='mt-3 w-100'
        variant="outline-primary"
        type="button"
        onClick={submit}
        disabled={isLoading || !isValid}
      >
        Create
      </Button>
      {
        !isValid && (
          <Alert variant='danger' className='mt-3'>
            <ul className='m-0'>
              {errorReasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </Alert>
        )
      }
    </>
  )
}
