import express from "express"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import bodyParser from "body-parser"
import cors from "cors"
import { Todo } from "./todo.js"
import { User } from "./user.js"

const startServer = async() => {

    const app = express();
    const server = new ApolloServer({
        typeDefs:`
            type User {
                name:String!
                username: String!
                email: String!
                address:Address!
            }
            
            type Address {
                street: String!
                city: String!
                suite: String!
                zipcode: String!
            }

            type Todo {
                userId:ID!
                id:ID!
                title:String
                completed:Boolean
                user:User
            }

            type Query{
                getTodo:[Todo]
                getAllUsers:[User]
                getUser(id:ID!):User
            }
        `,
        resolvers:{
            Todo: {
                user: (todo) => {
                    return User.find((u)=>  u.id == todo.userId)
                }
            },
            Query: {
                getTodo:() => {return Todo},
                getAllUsers:() => {return User},
                getUser:(parent,{id}) => {
                    return User.find((u)=>  u.id == id)
                }
            }
        }
    })

    app.use(bodyParser.json())
    app.use(cors())

    await server.start()
    
    app.use('/graphql',expressMiddleware(server))

    app.listen(8000,() => {
        console.log("server started on port 8000")
    })
}

startServer()