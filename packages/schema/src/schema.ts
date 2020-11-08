import { gql } from "apollo-server";

export default gql`
interface Response {
    code: ID!
    success: Boolean!
    message: String
}
type NewUserResponse implements Response {
    code: ID!
    success: Boolean!
    message: String
    user: User
}
input NewUserInput {
    email: String!
    username: String!
    password: String!
    terms: TermsInput!
}
input TermsInput {
    agelimit: Boolean!
    usepolicy: Boolean!
    privacy: Boolean!
    promotion: Boolean!
}
type Terms {
    agelimit: Boolean!
    usepolicy: Boolean!
    privacy: Boolean!
    promotion: Boolean!
}
type User {
    id: ID
    email: String
    homeId: ID
    username: String
    terms: Terms
}
type Query {
    users: [User]
}
type Mutation {
    newUser(user: NewUserInput!): NewUserResponse
}
`;