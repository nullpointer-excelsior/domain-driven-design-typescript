import { EntityState } from "../EntityState";

export type StateListener<T> = (state: T) => void;

interface StateOptions<T> {
    state: T;
    onBeforeUpdate?: StateListener<T>[];
    onAfterUpdate?: StateListener<T>[];
}

export class State<T> implements EntityState<T> {

    private state: T;
    private onBeforeUpdateListeners: StateListener<T>[] = []
    private onAfterUpdateListeners: StateListener<T>[] = []

    constructor(options: StateOptions<T>) {
        
        const { onAfterUpdate, onBeforeUpdate, state } = options
        this.onBeforeUpdateListeners = onBeforeUpdate ? onBeforeUpdate : []
        this.onAfterUpdateListeners = onAfterUpdate ? onAfterUpdate : []

        this.onBeforeUpdateState(state)
        this.state = state
        this.onAfterUpdateState(state)

    }

    addBeforeUpdateListener(listener: StateListener<T>) {
        this.onBeforeUpdateListeners.push(listener)
    }

    addAfterUpdateListener(listener: StateListener<T>) {
        this.onAfterUpdateListeners.push(listener)
    }

    private onBeforeUpdateState(state: T) {
        this.onBeforeUpdateListeners.forEach(listener => listener(state))
    }

    private onAfterUpdateState(state: T) {
        this.onAfterUpdateListeners.forEach(listener => listener(state))
    }

    get(): T {
        return this.state
    }

    set(state: T) {
        this.onBeforeUpdateState(state)
        this.state = { ...state }
        this.onAfterUpdateState(this.state)
    }

    reduce(fn: (prevState: T) => T): void {
        const newstate = fn(this.state)
        this.onBeforeUpdateState(newstate)
        this.state = { ...newstate }
        this.onAfterUpdateState(this.state)
    }


}
