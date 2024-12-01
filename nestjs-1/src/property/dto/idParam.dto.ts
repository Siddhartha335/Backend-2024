import { IsInt, IsPositive } from "class-validator";

export class IdParamDto {
    @IsInt()
    @IsPositive({message:"Must be an +ve number!"})
    id: number
}