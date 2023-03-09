
export type StateListener<T> = (state: T) => T;

export interface StateAccesors<T> {
    get(): T;
    set(state: T): void;
    reduce(reducer: (prevState: T) => T): void;
}

export class State<T> implements StateAccesors<T> {

    private state: T;
    private beforeUpdateListeners: StateListener<T>[] = []
    private afterUpdateListeners: StateListener<T>[] = []

    constructor(state: T) {
        this.onBeforeUpdateState(state)
        this.state = state
        this.onAfterUpdateState(state)
    }

    addBeforeUpdateListener(listener: StateListener<T>) {
        this.beforeUpdateListeners.push(listener)
    }

    addAfterUpdateListener(listener: StateListener<T>) {
        this.afterUpdateListeners.push(listener)
    }

    onBeforeUpdateState(state: T) {
        this.beforeUpdateListeners.forEach(listener => listener(state))
    }

    onAfterUpdateState(state: T) {
        this.afterUpdateListeners.forEach(listener => listener(state))
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
