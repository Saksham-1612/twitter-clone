import { graphql } from "@/src/gql";

export const loginUserQuery = graphql(`
  #graphql
  query LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      status
      token
    }
  }
`);
export const getCurrentUserQuery = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      _id
      email
      firstName
      profileImage
      lastName
    }
  }
`);
export const signUpMutation = graphql(`
  #graphql
  mutation Mutation(
    $firstName: String!
    $email: String!
    $password: String!
    $lastName: String
  ) {
    signUp(
      firstName: $firstName
      email: $email
      password: $password
      lastName: $lastName
    ) {
      id
      status
    }
  }
`);
