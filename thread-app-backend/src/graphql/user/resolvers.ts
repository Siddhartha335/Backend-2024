import UserService, { CreateUserPayload, GetUserTokenPayload } from "../../services/user.js";

const queries = {
    getUserToken : async(_:any,payload:GetUserTokenPayload) => {
        const res = await UserService.getUserToken(payload)
        return res
    },
    getLoggedInUser : async(_:any,__:any,context:any) => {
        if(context && context.user) {
            const user = await UserService.getUserById(context.user.id)
            return user
        }
        throw new Error("Not logged in")
    }
}

const mutations = {
    createUser : async(_:any,payload:CreateUserPayload) => {
        const res = await UserService.createUser(payload)
        return res.id;
    }
}

export const resolvers = {queries,mutations};