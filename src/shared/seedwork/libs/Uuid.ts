import { v4 as uuidv4 } from 'uuid';
import { ID } from '../ID';

export abstract class Uuid extends ID {

    constructor(id?: string) { 
        super(id ? id : uuidv4())
        if (id) {
            this.validateUUID(id)
        } 
    }

    private validateUUID(value: string) {
        const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        if (!regex.test(value)) {
            throw new Error(`UUID Value: ${value} invalid.`)
        }
    }

}