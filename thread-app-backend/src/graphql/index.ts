import { ApolloServer } from "@apollo/server"
import {User} from "./user/index.js"

const createApolloServer = async() => {

    const gqlServer = new ApolloServer({
        typeDefs:`
            ${User.typeDefs}
            type Query {
                ${User.queries},
            }
            type Mutation {
                ${User.mutations}
            }
        `,
        resolvers:{
            Query:{
                ...User.resolvers.queries,
                // getContext:(_:any,__:any,context) => {
                //     console.log(context)
                // }
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