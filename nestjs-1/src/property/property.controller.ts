import { Body, Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, Response, UsePipes, Headers,  ValidationPipe, Delete } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { QueryParamDto } from './dto/queryParam.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { createPropertySchema, CreatePropertyZodDto } from './dto/createPropertyZod.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';


@Controller('property')
export class PropertyController {

  constructor( private propertyservice:PropertyService) {}
    @Get()
    findAll() {
        return this.propertyservice.findAll()
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe)id) {
        return this.propertyservice.findOne(id)
    }

    //using zod validation
    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createPropertySchema))
    create(@Body() body:CreatePropertyZodDto) {
        return this.propertyservice.create(body)
    }

    
    // update(@Body(new ValidationPipe({
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //     groups: ["update"],
    //     always: true
    // })) body:CreatePropertyDto, @Param("id",ParseIdPipe) id,@RequestHeader(new ValidationPipe({
    //   validateCustomDecorators: true
    // })) header:HeadersDto) {
    //     return this.propertyservice.update()
    // }
    @Patch(":id")
    update(@Body() body, @Param("id",ParseIdPipe) id) {
        return this.propertyservice.update(id,body)
    }

    @Delete(":id")
    delete(@Param("id",ParseIdPipe) id) {
        return this.propertyservice.delete(id)
    }

}

// @Body( new ValidationPipe( {
//     whitelist: true,
// forbidNonWhitelisted: true,
// groups: ["update"],
// always: true
// })) body:CreatePropertyDto