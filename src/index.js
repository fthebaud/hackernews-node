const { GraphQLServer } = require('graphql-yoga')

// data
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

// Resolver object (= implementation of the schema, where/how to get the data)
const resolvers = {
    Query: {
        info: () => 'This is the API of hackernews clone',
        feed: () => links,
    },
}

// Instanciate the graphQL server with schema and resolver
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
  })

// Launch the graphQL server
server.start(() => console.log(`Server is running on http://localhost:4000`))