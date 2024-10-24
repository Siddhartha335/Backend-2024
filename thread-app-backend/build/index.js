import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
const init = async () => {
    const app = express();
    const PORT = 8000;
    app.use(express.json());
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello:String
            }

        `,
        resolvers: {
            Query: {
                hello: () => 'Hello I am a graphql server'
            }
        }
    });
    await gqlServer.start();
    app.get("/", (req, res) => {
        res.json({ msg: "Request sent to home route!" });
    });
    app.use("/graphql", expressMiddleware(gqlServer));
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};
init();
