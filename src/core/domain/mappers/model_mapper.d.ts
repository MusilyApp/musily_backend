/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IModelMapper<Entity> {
  fromJsonDataToEntity(jsonData: Record<string, any>): Entity;
}
