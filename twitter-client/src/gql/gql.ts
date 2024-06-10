/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  #graphql\n  query GetAllTweets {\n    getAllTweets {\n      _id\n      content\n      imageURL\n      author {\n        email\n        firstName\n        lastName\n        profileImage\n      }\n    }\n  }\n": types.GetAllTweetsDocument,
    "\n  #graphql\n  mutation CreateTweet($content: String!, $imageUrl: String) {\n    createTweet(content: $content, imageURL: $imageUrl) {\n      _id\n    }\n  }\n": types.CreateTweetDocument,
    "\n  #graphql\n  query LoginUser($email: String, $password: String) {\n    loginUser(email: $email, password: $password) {\n      status\n      token\n    }\n  }\n": types.LoginUserDocument,
    "\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      _id\n      email\n      firstName\n      profileImage\n      lastName\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  #graphql\n  mutation Mutation(\n    $firstName: String!\n    $email: String!\n    $password: String!\n    $lastName: String\n  ) {\n    signUp(\n      firstName: $firstName\n      email: $email\n      password: $password\n      lastName: $lastName\n    ) {\n      id\n      status\n    }\n  }\n": types.MutationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetAllTweets {\n    getAllTweets {\n      _id\n      content\n      imageURL\n      author {\n        email\n        firstName\n        lastName\n        profileImage\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetAllTweets {\n    getAllTweets {\n      _id\n      content\n      imageURL\n      author {\n        email\n        firstName\n        lastName\n        profileImage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation CreateTweet($content: String!, $imageUrl: String) {\n    createTweet(content: $content, imageURL: $imageUrl) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation CreateTweet($content: String!, $imageUrl: String) {\n    createTweet(content: $content, imageURL: $imageUrl) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query LoginUser($email: String, $password: String) {\n    loginUser(email: $email, password: $password) {\n      status\n      token\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query LoginUser($email: String, $password: String) {\n    loginUser(email: $email, password: $password) {\n      status\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      _id\n      email\n      firstName\n      profileImage\n      lastName\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      _id\n      email\n      firstName\n      profileImage\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation Mutation(\n    $firstName: String!\n    $email: String!\n    $password: String!\n    $lastName: String\n  ) {\n    signUp(\n      firstName: $firstName\n      email: $email\n      password: $password\n      lastName: $lastName\n    ) {\n      id\n      status\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation Mutation(\n    $firstName: String!\n    $email: String!\n    $password: String!\n    $lastName: String\n  ) {\n    signUp(\n      firstName: $firstName\n      email: $email\n      password: $password\n      lastName: $lastName\n    ) {\n      id\n      status\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;