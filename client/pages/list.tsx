import React from 'react'
import { Alert, Spinner, Table } from 'react-bootstrap'
import { ApolloProvider, type OperationVariables, Query, type QueryResult } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { gql } from '@apollo/react-hooks'
import setting from '../setting'

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${setting.apiPath}/graphql`
  }),
  cache: new InMemoryCache()
})

export default function ListPage (): React.JSX.Element {
  return (
    <>
      <ApolloProvider client={client}>
        <div>
          <h2>
            Book List&nbsp;
            <span role="img" aria-label="Rocket">🚀</span>
          </h2>
          <Books />
        </div>
      </ApolloProvider>
    </>
  )
}

const Books = (): React.JSX.Element => {
  const query = gql`
    {
      books {
        title
        author
      }
    }
  `

  return <Query query={query}>
    {
      (result: QueryResult<{
        books: Book[]
      }, OperationVariables>) => {
        if (result.loading || result.data == null) {
          return (
          <div className='mt-3 d-flex align-items-center'>
            <Spinner animation="border" role="status" className='me-3' />
            <span>Loading...</span>
          </div>
          )
        }
        if (result.error != null) {
          return (
          <Alert variant='danger' className='mt-3'>
            {result.error.message}
          </Alert>
          )
        }
        return (
          <>
            <Table className='mt-3'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {result.data.books.map((book, index) => (
                  <tr key={index}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )
      }
    }
  </Query>
}
