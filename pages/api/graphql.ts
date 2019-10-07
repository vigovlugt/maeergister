import { ApolloServer, gql } from "apollo-server-micro";
import typeDefs from "../../types/typeDefs";
import resolvers from "../../resolvers/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  tracing: true
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default server.createHandler({ path: "/api/graphql" });
