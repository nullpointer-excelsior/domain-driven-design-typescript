import { ID } from '../../../src/shared/seedwork/ID'
import { Entity } from './../../../src/shared/seedwork/Entity'


class ProductID extends ID { }

class Product extends Entity<ProductID> { }

describe('Entity', () => {

    it('equals() should return true', () => {

        const p1 = new Product(new ProductID('p-1'))
        const p2 = new Product(new ProductID('p-1'))

        expect(p1.equals(p2)).toBeTruthy()
        expect(p1.equals(undefined)).toBeFalsy()

    })

})