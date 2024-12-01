import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIdPipe implements PipeTransform<string,number> {
    transform(value: string, metadata: ArgumentMetadata): number {
        const val = parseInt(value,10);
        if(isNaN(val)){
            throw new BadRequestException(`The value ${value} is not a number`);
        }
        if(val <= 0){
            throw new BadRequestException(`The value ${value} is not a positive number`);
        }
        return val;
    }
    

}