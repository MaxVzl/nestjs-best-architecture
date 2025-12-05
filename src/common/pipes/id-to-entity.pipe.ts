import { ArgumentMetadata, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, EntityTarget, ObjectLiteral } from 'typeorm';

export class IdToEntityPipe<T extends ObjectLiteral> implements PipeTransform {
  constructor(@InjectEntityManager() readonly entityManager: EntityManager) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<T> {
    const { metatype } = metadata;

    const entity = await this.entityManager.findOne(metatype as EntityTarget<T>, {
      where: { id: value },
    });
    if (!entity) {
      throw new NotFoundException(`${metatype} with id:${value} not found`);
    }
    
    return entity;
  }
}
