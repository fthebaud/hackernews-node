const { GraphQLServer } = require('graphql-yoga')

// 1 - GraphQl schema
// We can query for a root field "info" which is a (non null) string
// Root fields defined the available API operations 
// Note: it exists 3 special root types: Query, Mutation, Subscription
const typeDefs = `
type Query {
    info: String!
    feed: [Link!]!
}

type Link {
    id: ID!
    description: String!
    url: String!
}
`;

// data
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

// 2 - Resolver object (= implementation of the schema, where/how to get the data)
const resolvers = {
    Query: {
        info: () => 'This is the API of hackernews clone',
        feed: () => links,
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

// 3 - Instanciate the graphQL server with schema and resolver
const server = new GraphQLServer({
    typeDefs,
    resolvers,
  })

// Launch the graphQL server
server.start(() => console.log(`Server is running on http://localhost:4000`))