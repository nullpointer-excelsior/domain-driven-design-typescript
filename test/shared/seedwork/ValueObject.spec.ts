import { ValueObject } from './../../../src/shared/seedwork/ValueObject'

class Email extends ValueObject<string>{

}

class Address extends ValueObject<{ street: string; city: string; }> {

}

describe('ValueObject', () => {

    it('equals() should return true', () => {
        
        const email = new Email('xxx@xxx.com')
        expect(email.equals(new Email('yyy@yyy.com'))).toBeFalsy()
        expect(email.equals(new Email('xxx@xxx.com'))).toBeTruthy()

        const address = new Address({ street: 'alamos', city: 'santiago'})
        expect(address.equals(new Address({ street: 'alerces', city: 'santiago'}))).toBeFalsy()
        expect(address.equals(new Address({ street: 'alamos', city: 'santiago'}))).toBeTruthy()

    })

})