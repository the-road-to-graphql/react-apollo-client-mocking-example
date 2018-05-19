export const typeDefs = `
  type Query {
    organization(login: String!): Organization!
  }

  type Organization {
    name: String!
    url: String!
    repositories: RepositoryConnection!
  }

  type RepositoryConnection {
    edges: [RepositoryEdge!]!
  }

  type RepositoryEdge {
    node: Repository!
  }

  type Repository {
    id: String!
    name: String!
    url: String!
    viewerHasStarred: Boolean!
  }

  type Mutation {
    addStar(input: AddStarInput!): AddStarResult!
  }

  input AddStarInput {
    starrableId: ID!
  }

  type AddStarResult {
    starrable: Starrable!
  }

  type Starrable {
    id: ID!
    viewerHasStarred: Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    addStar: (parent, { input }) => ({
      starrable: {
        id: input.starrableId,
        viewerHasStarred: true,
      },
    }),
  },
  Query: {
    organization: (parent, { login }) => ({
      name: login,
      url: `https://github.com/${login}`,
      repositories: {
        edges: [
          {
            node: {
              id: '1',
              name: 'the-road-to-learn-react',
              url: `https://github.com/${login}/the-road-to-learn-react`,
              viewerHasStarred: false,
            },
          },
          {
            node: {
              id: '2',
              name: 'the-road-to-learn-react-chinese',
              url: `https://github.com/${login}/the-road-to-learn-react-chinese`,
              viewerHasStarred: false,
            },
          },
        ],
      },
    }),
  },
};
