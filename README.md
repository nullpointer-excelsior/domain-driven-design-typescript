# Modelando el dominio con técnicas de Domain Driven Design

Domian Driven Design nos da una serie de patrones y guia de diseños para modelar el dominio de nuestra aplicacion acercandonos al punto de vista de expertos. 
si bien DDD es recomendado para sistemas complejos, utilizar los patrones de diseño y estrategías en nuestras aplicaciones 
nos dará la posibilidad de crear código mantenible testeable y que se aleja del tan llamado modelo anemico.

A continuacíon les presentaré componentes de software reutilizables con los cual podras aprender conceptos de DDD, si bien esta no es una guía de Domain Driven Design, utilizar 
uno que otro patrón de diseño nos ayudará a mejorar como ingenieros de software.

## SeedWork concepto de microlibrería

Seedwork es un termino acuñado por los tan famosos y faranduleros padres del software no recuerdo el nombre pero lo importante es el concepto. SeedWork se refiere a un conjunto de componentes
reutilizables que serán la base de nuestro dominio. Estos contendrán estructuras bases reutilizables y nos darán la guía como debemos modelar los componentes del dominio, también tendrán las dependencias base de librerás de terceros. si utilizamos librerías de terceros como validaciones, operaciones con fechas y tiempo, etc. debemos tener en cuenta de crear los componentes lo mas desacoplados posibles de estas librerías, para lograrlo podemos hacer uso de patrones de diseño u otras técnicas sencillas de POO.

## Componentes básicos de DDD

Los componentes básicos en DDD son los siguientes en forma de árbol

* Entities
    * Value Objects
    * Identifiers
* AggregateRoot
* Domain Events
* Repositories
* Domain services
* DTO
* Factories
* Use Cases
* Application Services
* Bounded Context

Si bien estos son los componentes base que encontraremos en DDD nos centraremos en Nuestra entidades y sus operaciones mas otros casos que podmeos encontrarnos cuando desarrollamos las lógicas de negocio

### Identificadores

Nuestras entidades deben tener identidad es decir ser unicos, par alograrlo crearemos nuestro componente `ID` el cual representará la identidad de nuestra entidad

```typescript
export class ID {

    constructor(private value: string) { }

    equals(id?: ID): boolean {
        if (id === null || id === undefined) {
            return false;
        }
        if (!(id instanceof this.constructor)) {
            return false;
        }
        return id.toValue() === this.value;
    }

    toString() {
        return String(this.value);
    }

    toValue(): string {
        return this.value;
    }

}

```

Los identificadores de nuestras entidades deben heredar de ID la cual posee métodos base utiles
```typescript

class ProductId extends ID {

}

```
### Entidades

Generaremos una entidad Base la cual debe intanciarse con una ID. Esta entidad tendra el método `equals()` que nos permitira obtenr la igualdad de nuestras entidades

```typescript

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
```
Uso
```typescript

class Product extends Entity<ProductId>{
    // more code...
}

```
### Value objects
Los value objects son objetos que no tienen identidad es decir son contenedores de valores que pueden contener lógicas de validación o calculos simples. La importancia de los ValueObjects es que nos permiten crear custom types de las propiedades de una entidad para evitar el uso de datos primitivos, por ejemplo en un dominio anemico un campo como lo puede ser un Email lo definimos como un `String` sin embargo un Email dentro del contexto de dominio no es un `String` no necesitamos los metodos relacionados al tratamiento de cadenas, un Objeto email deberia tener metodos relacionados a su papel dentro del dominio incluyendo validaciones o metodos de utilidades

Nuestro ValueObject Base es
```typescript

interface ValueObjectProps {
    [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps | any> {

    constructor(protected props: T) { }

    getValue() {
        return this.props
    }

    public equals(vo?: ValueObject<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        return JSON.stringify(this.props) === JSON.stringify(vo.props);
    }

}
```
Y su uso
```typescript

class Email extends ValueObject<string> {
    constructor(value: string) {
        // validate format
        super(value)
    }

}

class PersonalData extends ValueObject<{ firstname: string, lastname: string }> {

}

```
### Entidad con estado
Las entidades deben mantener un estado consistente es decir que sus valores deben reflejar perfectamente el estado del negocio esto podemos lograrlo en parte con los value objects ya que estos pueden crear validaciones antes de intanciar un estado incorrecto. Cuando las validaciones dependen de varios valores podemos hacer uso de esta clase utilitaria inspirada en manejadores de estado. este patrón no es propio de DDD pero puede ser de ayuda en Entidades con logicas complejas


```typescript

export type StateListener<T> = (state: T) => T;

export class State<T> {

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
```
Esta clase nos ayuda a crear un estado dentro de una entidad en donde podremos obtener los valores setear un nuevo estado mediante `set()` o mediante `reduce()` pero la magia de esta clase estan en `StateListener<T>` este componente nos permite escuchar cambios en el estado antes d esetear y despues de setear un nuevo estado, con este enfoque podemos geenrar un validador de estado de la siguiente manera

```typescript

export type EntityProps<T> = T & { id: ID }

export class StatefulEntity<T extends ID, R> extends Entity<T>{

    protected state: State<R>;

    constructor(props: EntityProps<R>) {
        super(props.id)
        this.state = new State<R>({ ...props })
    }

}

```
Para utilizar el estado podemos hace uso de la siguiente clase de entidad

```typescript

```
### Eventos de dominio
Los eventos de dominio son acciones ocurridas en nuestras entidades para poder hacer uso de estos componentes definimos las siguientes clases

```typescript
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

export class DomainEventManager {

    private events: DomainEvent<any>[] = []

    public push(event: DomainEvent<any>) {
        this.events.push(event)
    }

    public count() {
        return this.events.lenght
    }

    public pull() {
        const domainEvents = this.events.slice();
        this.events = [];
        return domainEvents;
    }

}
```
