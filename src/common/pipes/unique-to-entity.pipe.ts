import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, EntityTarget, FindOptionsWhere, ObjectLiteral } from 'typeorm';

export const UniqueToEntityPipe = <T extends ObjectLiteral>(property: string = 'id') => {
  @Injectable()
  class UniqueToEntityPipe implements PipeTransform {
    constructor(@InjectEntityManager() readonly entityManager: EntityManager) {}

    async transform(value: any, metadata: ArgumentMetadata): Promise<T> {
      const { metatype } = metadata;

      const entity = await this.entityManager.findOne(metatype as EntityTarget<T>, {
        where: { [property]: value } as FindOptionsWhere<T>,
      });
      if (!entity) {
        throw new NotFoundException(`${metatype} with ${property}:${value} not found`);
      }
      
      return entity;
    }
  }
return UniqueToEntityPipe;
};
