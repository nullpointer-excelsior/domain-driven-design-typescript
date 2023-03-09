
export type Result<T, E> = Success<T, E> | Failure<T, E>;

export class Success<T, E> {
    
    readonly success: T;

    constructor(success: T) {
        this.success = success;
    }

    map<U>(fn: (x: T) => U): Result<U, E> {
        return new Success(fn(this.success));
    }

    flatMap<U>(fn: (x: T) => Result<U, E>): Result<U, E> {
        return fn(this.success);
    }

    isError(): this is Failure<T, E> {
        return false;
    }
    
    match<U>(onSuccess: (value: T) => U, onFailure: (error: E) => U): U {
        return onSuccess(this.success);
    }

}

export class Failure<T, E> {

    readonly error: E;

    constructor(error: E) {
        this.error = error;
    }

    map<U>(_fn: (x: T) => U): Result<U, E> {
        return new Failure(this.error);
    }

    flatMap<U>(_fn: (x: T) => Result<U, E>): Result<U, E> {
        return new Failure(this.error);
    }

    isError(): this is Failure<T, E> {
        return true;
    }

    match<U>(onSuccess: (value: T) => U, onFailure: (error: E) => U): U {
        return onFailure(this.error);
    }

}
