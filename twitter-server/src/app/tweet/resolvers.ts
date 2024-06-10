import { Tweet } from "../../Model/TweetModel";
import { IUser, User } from "../../Model/UserModel";

export interface CreateTweetPayload {
  content: string;
  imageUrl?: string;
}

const queries = {
  getAllTweets: async () => await Tweet.find({}).sort({ createdAt: -1 }),
};
const mutations = {
  createTweet: async (
    _: any,
    { content, imageUrl }: CreateTweetPayload,
    context: any
  ) => {
    if (!context.user || !context.user._id) {
      throw new Error("Unauthorized access");
    }

    const tweet = await Tweet.create({
      content,
      imageURL: imageUrl,
      author: context.user._id,
    });
    // console.log(tweet);
    return tweet;
  },
};

const extraResolvers = {
  Tweet: {
    author: async (parent: any) => await User.findById(parent.author),
  },
};

export const resolvers = {
  queries,
  mutations,
  extraResolvers,
};
