import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import prisma from "./lib/db.js";

const init = async() => {
    const app = express();
    const PORT:number = Number(process.env.PORT) || 8000;

    app.use(express.json())

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

    app.get("/",(req,res)=> {
        res.json({msg:"Request sent to home route!"})
    })

    app.use("/graphql",expressMiddleware(gqlServer))

    app.listen(PORT,()=> {
        console.log(`Server started on port ${PORT}`);
    })

}

init()



