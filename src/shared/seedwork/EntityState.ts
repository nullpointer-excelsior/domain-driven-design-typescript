export interface EntityState<T> {
    get(): T;
    set(state: T): void;
    reduce(reducer: (prevState: T) => T): void;
}

interface State {
    name: string;
    stock: number;
}



export class ProductState<T> implements EntityState<T> {
    
    private state: T;
  
    constructor(state: T) {
      this.state = state;
    }
    
    get(): T {
        throw new Error("Method not implemented.");
    }

    reduce(reducer: (prevState: T) => T): void {
        throw new Error("Method not implemented.");
    }
  
    set(state: T): void {
      this.state = state;
    }
  
    // Crear propiedades dinámicas
    setProp<K extends keyof T>(key: K, value: T[K]): void {
      this.state[key] = value;
    }
  
    getProp<K extends keyof T>(key: K): T[K] {
      return this.state[key];
    }
  }

class NewState extends ProductState<State> {

}

const state = new NewState({ name: 'guitar', stock: 10})

state.getProp('stock')

state.setProp('name', 'slñs')
state.setProp('stock', 120)

