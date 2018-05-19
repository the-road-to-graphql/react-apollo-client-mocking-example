export const typeDefs = `
  type Query {
    organization(login: String!): Organization!
  }

  type Organization {
    name: String!
    url: String!
  }
`;

export const resolvers = {
  Query: {
    organization: (parent, { login }) => ({
      name: login,
      url: `https://github.com/${login}`,
    }),
  },
};
