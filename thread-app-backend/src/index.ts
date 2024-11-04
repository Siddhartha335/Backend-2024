import express from "express";
import { expressMiddleware } from '@apollo/server/express4';
import createApolloServer from "./graphql/index.js";
import UserService from "./services/user.js";

const init = async() => {
    const app = express();
    const PORT:number = Number(process.env.PORT) || 8000;

    app.use(express.json())

    app.get("/",(req,res)=> {
        res.json({msg:"Request sent to home route!"})
    })

    const gqlServer = await createApolloServer()

    app.use("/graphql",expressMiddleware(gqlServer,{
        context: async({req}) => {
            const token = req.headers['token']
            try {
                const user = UserService.decodeToken(token as string)
                return {user}
            } catch (error) {
               return {}
            }
        }
    }))

    app.listen(PORT,()=> {
        console.log(`Server started on port ${PORT}`);
    })

}

init()



