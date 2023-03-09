import { ID } from './../../../src/shared/seedwork/ID'


describe('ID', () => {
    
    it('should return true for string ID', () => {
        const id = new ID('abcd')
        expect(id.equals(new ID('abcd'))).toBeTruthy()
        expect(id.equals(new ID('efgh'))).toBeFalsy()
    })

})