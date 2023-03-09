import { ErrorHandler } from '../../../../src/shared/seedwork/libs/ErrorHandler';


describe('ErrorHandler', () => {
    
    describe('match()', () => {
      
        it('should call the handler function if it exists', () => {
        
        const mockHandler = {
          'ERR1': jest.fn()
        };
  
        const errorHandler = new ErrorHandler<'ERR1'>('ERR1');
        errorHandler.match(mockHandler);
  
        expect(mockHandler['ERR1']).toHaveBeenCalled();
      });
  
      it('should not call the handler function if it does not exist', () => {
        const mockHandler = {
          'ERR2': jest.fn(),
          'ERR1': jest.fn()
        };
  
        const errorHandler = new ErrorHandler<'ERR2'|'ERR1' >('ERR1');
        errorHandler.match(mockHandler);
  
        expect(mockHandler['ERR2']).not.toHaveBeenCalled();
      });
    });

  });
  