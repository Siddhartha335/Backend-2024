import { ApolloServer } from "@apollo/server"
import prisma from "../lib/db.js"
import {User} from "./user/index.js"

const createApolloServer = async() => {

    const gqlServer = new ApolloServer({
        typeDefs:`
            type Query {
                ${User.queries}
            }
            type Mutation {
                ${User.mutations}
            }
        `,
        resolvers:{
            Query:{
                ...User.resolvers.queries
            },
            Mutation:{
                ...User.resolvers.mutations
            }
        }
    })

    await gqlServer.start()

    return gqlServer

}

export default createApolloServer;