import { IsString, Length } from "class-validator";

export class QueryParamDto {
    @IsString()
    @Length(2,10)
    query: string
}