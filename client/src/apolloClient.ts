import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost"
import setting from "../setting"

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${setting.apiPath}/graphql`
  }),
  cache: new InMemoryCache()
})

export default client
