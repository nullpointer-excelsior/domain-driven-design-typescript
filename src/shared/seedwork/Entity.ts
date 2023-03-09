import { ID } from "./ID";

const isEntity = (v: any): v is Entity<any> => {
    return v instanceof Entity;
}

export abstract class Entity<T extends ID> {

    private readonly id: ID 

    constructor(id: ID) {
        this.id = id
    }

    public equals(object?: Entity<T>): boolean {

        if (object == null || object == undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!isEntity(object)) {
            return false;
        }

        return this.id.equals(object.id);

    }

    get ID() {
        return this.id
    }
    
}

export type EntityProps<T> = T & { id: ID }