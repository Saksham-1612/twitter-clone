import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";

export const graphqlClient = new GraphQLClient("http://localhost:4000/", {
  headers: () => ({
    Authorization: isClient
      ? `${window.localStorage.getItem("token") || ""}`
      : "",
  }),
});
