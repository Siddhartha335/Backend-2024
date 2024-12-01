import { Body, Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { QueryParamDto } from './dto/queryParam.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { createPropertySchema, CreatePropertyZodDto } from './dto/createPropertyZod.dto';

interface Data {
    id:number,
    name:string,
    location?:string
    type?:string
}

let data:Data[] = [
    {
      "id": 1,
      "name": "Thecho property",
      "location": "Thecho, Kathmandu"
    },
    {
      "id": 2,
      "name": "London property",
      "location": "London, UK"
    },
    {
      "id": 3,
      "name": "New York property"
    }
  ];;

@Controller('property')
export class PropertyController {
    @Get()
    findAll(): Data[] {
        return data 
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe)id, @Query("search", ParseBoolPipe) query) {
        const data = this.findAll();
        console.log(typeof id,typeof query);
        const specificData =data.filter((item) => item.id == id);
        return specificData;
    }

    //using zod validation
    @Post()
    @HttpCode(201)
    // @UsePipes( new ValidationPipe({
    //     whitelist: true,
    // forbidNonWhitelisted: true,}))
    @UsePipes(new ZodValidationPipe(createPropertySchema))
    create(@Body() body:CreatePropertyZodDto) {
        // data.push(body);   
        return body
    }

    @Patch(":id")
    update(@Body() body:CreatePropertyDto, @Param("id",ParseIdPipe) id ,@Query() query:QueryParamDto) {
        return body
    }


}

// @Body( new ValidationPipe( {
//     whitelist: true,
// forbidNonWhitelisted: true,
// groups: ["update"],
// always: true
// })) body:CreatePropertyDto