import { GraphQLServer } from 'graphql-yoga'
const session = require('express-session')
import { Prisma } from './generated/prisma'
import resolvers from './resolvers'


const opts = {
  cors: {
    credentials: true,
    origin: ['http://localhost:3000'] // your frontend url.
  }
};


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma API (value set in `.env`)
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      // secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
    }),
  }),
})

server.express.use(session({
  name:'qid',
  secret: "xxxyyyxxxxyz",
  resave: true,
  saveUninitialized: false
}))

server.start(opts, () => console.log(`Server is running on http://localhost:4000`))