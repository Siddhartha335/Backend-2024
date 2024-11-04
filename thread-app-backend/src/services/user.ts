import prisma from "../lib/db.js"
import {createHmac , randomBytes} from "node:crypto"
import JWT from "jsonwebtoken"

export interface CreateUserPayload {
    firstName: string,
    lastName?: string,
    email: string,
    password: string
}

export interface GetUserTokenPayload{
    email: string,
    password: string
}

class UserService {

    public static generateHash(password:string,salt:string) {
        return createHmac("sha256",salt).update(password).digest("hex")
    }
    public static async createUser(payload:CreateUserPayload) {
        const {firstName,lastName,email,password} = payload
        const salt = randomBytes(16).toString("hex")
        const hashedPassword = UserService.generateHash(password,salt)
        return await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password:hashedPassword
            }
        })
    }

    private static async getUserByEmail(email:string) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }
    
    public static async getUserToken(payload:GetUserTokenPayload) {
        const {email,password} = payload
        const user = await UserService.getUserByEmail(email);

        if(!user) throw new Error("User not found")

        const userSalt = user.salt;
        const userHashedPassword = UserService.generateHash(password,userSalt);

        if(user.password !== userHashedPassword) throw new Error("Invalid password")

        const token = JWT.sign({
            email:user.email,
            id:user.id
        },process.env.JWT_SECRET!,{expiresIn:"1d"})

        return token

    }

}

export default UserService