import { graphql } from "@/src/gql";

export const getAllTweetsQuery = graphql(`
  #graphql
  query GetAllTweets {
    getAllTweets {
      _id
      content
      imageURL
      author {
        email
        firstName
        lastName
        profileImage
      }
    }
  }
`);

export const createTweetMutuation = graphql(`
  #graphql
  mutation CreateTweet($content: String!, $imageUrl: String) {
    createTweet(content: $content, imageURL: $imageUrl) {
      _id
    }
  }
`);
