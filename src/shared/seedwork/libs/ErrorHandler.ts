export class ErrorHandler<T extends string> {
    
    constructor(private error: T, private message: string = 'No provided error message') {}

    match(handler: Record<T, (message: string) => void>) {
        if (handler.hasOwnProperty(this.error)) {
            handler[this.error](this.message);
        }
    }

}