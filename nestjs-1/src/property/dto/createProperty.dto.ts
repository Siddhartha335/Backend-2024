import { IsInt, IsPositive, IsString, Length } from "class-validator";

export class CreatePropertyDto {
    @IsInt()
    @IsPositive({message: "Must be a positive number"})
    id: number;

    @IsString()
    @Length(2,30,{groups: ["create"]})
    @Length(1,35,{groups: ["update"]})
    // @Length(2, 10,{message: "Name must be between 2 and 10 characters"})
    name: string;

    @IsString()
    description: string
}