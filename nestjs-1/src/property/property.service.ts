import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyZodDto } from './dto/createPropertyZod.dto';

@Injectable()
export class PropertyService {

  constructor( @InjectRepository(Property) private propertyRepo: Repository<Property>) {}

    async findAll() {
      return await this.propertyRepo.find();
    }

    async findOne(id:number) {
      const property = await this.propertyRepo.findOne({
        where: {
          id
        }
      })
      if(!property) {
        throw new NotFoundException(`Property with id ${id} not found`)
      } 
      return property
    }

    async create(dto:CreatePropertyZodDto) {
      return await this.propertyRepo.save(dto)
    }

    async update(id:number, data:any) {
      const specificData = await this.propertyRepo.findOne({
        where: {
          id
        }
      })
      return await this.propertyRepo.update(id,{...specificData,...data})
    }

    async delete(id:number) {
      const successfullyDeleted =  await this.propertyRepo.delete(id)
      if(successfullyDeleted.affected === 0) {
        throw new NotFoundException(`Property with id ${id} not found`)
      }
      return successfullyDeleted
    }
}
