import { DomainEvent } from "../DomainEvent";

export class DomainEventManager {

    private events: DomainEvent<any>[] = []

    public push(event: DomainEvent<any>) {
        this.events.push(event)
    }

    public pull() {
        const domainEvents = this.events.slice();
        this.events = [];
        return domainEvents;
    }

}