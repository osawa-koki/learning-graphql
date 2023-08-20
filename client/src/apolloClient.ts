import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import setting from '../setting'

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${setting.apiPath}/graphql`
  }),
  cache: new InMemoryCache()
})

export default apolloClient
