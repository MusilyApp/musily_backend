export interface IModelMapper<Entity> {
  fromObjectToEntity(object: Record<string, unknown>): Entity;
  fromEntityToObject(entity: Entity): Record<string, unknown>;
  fromJson(json: string): Entity;
  toJson(entity: Entity): string;
}
