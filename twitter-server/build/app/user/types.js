"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql
    type User {
        _id: ID!
        firstName: String!
        lastName: String
        password:String!
        email: String!
        profileImage: String
        tweets:[Tweet]
    }
    type UserResponse{
        _id: ID!
        firstName: String!
        lastName: String
        email: String!
        profileImage: String
        tweets:[Tweet]
    }
    type SignUpResponse {
        status: String!
        id: ID
    }
    type loginResponse {
        status: String!
        token: String
    }
`;
