import { Entity } from "../Entity";
import { ID } from "../ID";
import { State } from './State';

export type EntityProps<T> = T & { id: ID }


export class StatefulEntity<T extends ID, R> extends Entity<T>{

    protected state: State<R>;

    constructor(props: EntityProps<R>) {
        super(props.id)
        this.state = new State<R>({ 
            state: { ...props }
        })
    }

}
