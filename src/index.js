const { GraphQLServer } = require('graphql-yoga')

// data
let links = [{
    id: '0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

// Resolver object (= implementation of the schema, where/how to get the data)
// Each resolver function has four arguments: 
//      1 - parent: result of the previous resolver execution level
//      2 - args: arguments for the operation
//      3 - :
//      4 - :
const resolvers = {
    Query: {
        info: () => 'This is the API of hackernews clone',
        feed: () => links,
        link: (parent, args) => links[args.id]
    },

    Mutation: {
        createLink: (parent, args) => {
            const link = {
                id: links.length,
                url: args.url,
                description: args.description,
            }
            links.push(link);
            return link;
        },
        updateLink: (parent, args) => {
            const {id, url, description} = args;
            if (url) {
                links[id].url = url;
            }
            if (description) {
                links[id].description = description;
            }
            return links[id];
        },
        deleteLink: (parents, args) => {
            const {id} = args;
            if (links[id]) {
                links.splice(id, 1);
                return id;
            }
            return null;
        }
    }
}

// Instanciate the graphQL server with schema and resolver
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
  })

// Launch the graphQL server
server.start(() => console.log(`Server is running on http://localhost:4000`))