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