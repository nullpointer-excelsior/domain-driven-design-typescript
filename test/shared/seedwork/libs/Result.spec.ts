import { Success, Failure, Result } from '../../../../src/shared/seedwork/libs/Result';


function divide(a: number, b: number): Result<number, string> {
    if (b === 0) {
        return new Failure('Cannot divide by zero');
    }
    return new Success(a / b);
}

describe('Result', () => {

    it('should return a Success result', () => {
        const result = divide(10, 2)
        expect(result.isError()).toBeFalsy()
        if (!result.isError()) {
            expect(result.success).toBe(5)
        }

    });

    it('should return a Failure result', () => {
        const result = divide(10, 0)
        expect(result.isError()).toBeTruthy()
        if (result.isError()) {
            expect(result.error).toBe('Cannot divide by zero')
        }
    });

   
});
