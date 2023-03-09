import { Uuid } from "./libs/Uuid";

export class EventID extends Uuid { 

}

export abstract class DomainEvent<T> {

    public readonly ID: EventID
    public readonly timestamp: Date;
    public readonly data: T;

    abstract get name(): string;

    constructor(data: T) { 
        this.ID = new EventID()
        this.timestamp = new Date()
        this.data = data
    }

}