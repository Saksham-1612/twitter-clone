import { Tweet } from "../../Model/TweetModel";
import { User } from "../../Model/UserModel";
import UserService, {
  CreateUserPayload,
  LoginUserPayload,
} from "../../services/UserService";

// Define the queries
const queries = {
  loginUser: async (_: any, { email, password }: LoginUserPayload) => {
    const res = await UserService.loginUser({
      email,
      password,
    });
    return {
      status: res.status,
      token: res?.token,
    };
  },
  getCurrentUser: async (_: any, params: any, context: any) => {
    return context.user;
  },
};

// Define the mutations
const mutations = {
  signUp: async (
    _: any,
    { firstName, lastName, email, password }: CreateUserPayload
  ) => {
    const res = await UserService.createUser({
      firstName,
      lastName,
      email,
      password,
    });
    return {
      status: res.status,
      id: res?.user ? res.user._id.toString() : null,
    };
  },
};

// Define extra resolvers for the User type
const extraResolvers = {
  User: {
    tweets: async (parent: any) => await Tweet.find({ author: parent._id }),
  },
};

// Combine resolvers
export const resolvers = {
  queries,
  mutations,
  extraResolvers,
};
