import { ApolloServer } from "@apollo/server"
import prisma from "../lib/db.js"

const createApolloServer = async() => {

    const gqlServer = new ApolloServer({
        typeDefs:`
            type Query {
                hello:String
                sayMyName(name:String):String
            }
            type Mutation {
                createUser(firstName:String!,lastName:String!,email:String!,password:String!):Boolean
            }

        `,
        resolvers:{
            Query:{
                hello: ():string => 'Hello I am a graphql server',
                sayMyName:(parent,{name}:{name:string}):string => `My name is ${name}`
            },
            Mutation:{
                createUser: async(parent,{firstName,lastName,email,password}:{firstName:string,lastName:string,email:string,password:string}) => {
                    await prisma.user.create({
                        data: {
                            firstName,
                            lastName,
                            email,
                            password,
                            salt:"random_salt"
                        }
                    })
                    return true
                }
            }
        }
    })

    await gqlServer.start()

    return gqlServer

}

export default createApolloServer;