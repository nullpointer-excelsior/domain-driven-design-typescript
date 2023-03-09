import { Uuid } from './../../../../src/shared/seedwork/libs/Uuid';

const RANDOM_UUID = 'c0c9328d-8770-417b-94f1-6051d837e22c'

class CustomId extends Uuid {

}

describe('EntityUuid', () => {

    test('constructor() crea una instancia con un id válido', () => {
        const entityUuid = new CustomId();
        expect(entityUuid.toValue()).toBeTruthy();
    });


    test('constructor() crea una instancia con un id que cumple la expresión regular', () => {

        const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

        let entityUuid = new CustomId();
        let isValidId = regex.test(entityUuid.toValue());
        expect(isValidId).toBe(true);

        entityUuid = new CustomId(RANDOM_UUID)
        isValidId = regex.test(entityUuid.toValue());
        expect(isValidId).toBe(true);

    });

    test('constructor() valida que se instancie con un valor uuid', () => {
        expect(() => new CustomId('1234')).toThrowError();
    });
    
});
