import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import connectToDB from "./db/db";
import { UserGql } from "./app/user";
import UserService from "./services/UserService";
import { TweetGql } from "./app/tweet";
import { IUser } from "./Model/UserModel"; // Ensure correct import

connectToDB();

const url = "http://localhost:4000/";

const server = new ApolloServer({
  typeDefs: `
    ${UserGql.types}
    ${TweetGql.types}

    type Query {
      ${UserGql.queries}
      ${TweetGql.queries}
    }
    type Mutation {
      ${UserGql.mutations}
      ${TweetGql.mutations}
    }
  `,
  resolvers: {
    Query: {
      ...UserGql.resolvers.queries,
      ...TweetGql.resolvers.queries,
    },
    Mutation: {
      ...UserGql.resolvers.mutations,
      ...TweetGql.resolvers.mutations,
    },
    ...TweetGql.resolvers.extraResolvers,
    ...UserGql.resolvers.extraResolvers,
  },
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const token = req.headers.authorization || "";

    let user;
    if (token) {
      user = await UserService.getUserFromToken(token as string);
    }

    return { user: user ? user : {} };
  },
});

console.log(`🚀  Server ready at: ${url}`);
