# Robusto control de errores mas allá de try catch

El control de errores en aplicaiones tradicionalmente los manjamos mediante trycatch si bien esto nos proporciona una manera efectiva y simple de controlar errores y definir logicas un poco mas elaboradas de cara al cliente, existe otra alternativa proveniente de la programacion funcional.

## Either Monad

Either monad es un patron de diseño presnete en la programacion funcional, basicamente creamos una respuesta donde contendremos 2 valores
* Right value: lo que queremos retornar cuando nuestro codigo realiza una operacion exitosa
* Left value: retornamos un objeto que representa un error 

Básicamente este patron nos define una respuesta con 2 posibles estados exitoso o fallido, este simple enfoque nos provee una manera de control de errores mucho mas orientada a multiples respuestas si se implementa con el patron pattern matching que algunos lenguajes tienen disponibles.

## TryCatch vs Either

Dependiendo del escenario trycatch puede dejar de ser una manera efectiva de controlar errores ya que una excepcion se refiere a algo excepcional que ha ocurrido en el sistema y este debe interrumpirse o tratar de recuperarse. Un excepcion es adecuada para los siguientes casos:

* Problemas de red o conexion
* Errores en librerias de bajo nivel
* Errores correspondiente al ambiente o sistema operativo

En cambio Either es ideal para un control de errores mas especificos relacionados con logicas de dominio ya que nos obliga a definir la respuesta correcta a ciertos errores, si bien la implemtnacion de Either por si sola nos da la psoibilidad entre una respusta exitosa y una fallida Either a menudo se implementa junto a pattern matching otro patron encontrado en programacion funcional. Esta combinacion nos permite tener el control total de un flujo relacionado a la logica principal del programa ya que estaremos obligados a implementar todas las posibles respuestas fallidas incluyendo el caso exitoso esto separa totalmente las excepciones de los errores de logicas 

## Implemntando un control de errores avanzados con typescript


La implemntacion básica de Either esta dada por el siguiente codigo

```typescript
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

```
El uso de Either esta dado por el suiguiente ejemplo
```typescript

```
Esta lógica es sumamente sencilla y nos permiotira un control avanzado en typescript con la siguiente clase de ayuda
```typescript
export class ErrorHandler<T extends string> {
    
    constructor(private error: T, private message: string = 'No provided error message') {}

    match(handler: Record<T, (message: string) => void>) {
        if (handler.hasOwnProperty(this.error)) {
            handler[this.error](this.message);
        }
    }

}
```
Esta clase recibe un tipo generico que representara los errores que pueden ocurrir, el metodo match se encarga de invocar una funcion callback asociada al error. Para entender mejor este codigo crearemos nuestro error handler basados en una api de productos

```typescript

export type ProductErrors = 'unavailableStock' | 'serverError' | 'otherError' 

export class ProductErrorHandler extends ErrorHandler<ProductErrors> {

}

```
El siguiente ejemplo nos permite entender el uso del patron Either, el método `udpateStock()` dependiendo del caso devolverá una respuesta exitosa o un error especifico el cual puede tratarse de una manera mas personalizada
```typescript
export class ProductService {

    constructor(
        private productRepository: ProductRepository,
        private stockRepository: StockService
    ) {}

    updateStock(id: string, stock: number): Result<any, UpdateStockErrorHandler> {

        const product = this.productRepository.findById(new ProductID(id))

        if (!product) {
            return new Failure(new UpdateStockErrorHandler('productNotFound', `Product(id=${id}) Not found`))
        }
        
        const stockAvailable = this.stockRepository.queryStock(product.ID)

        if (stockAvailable < 0) {
            return new Failure(new UpdateStockErrorHandler('unavailableStock', `Product(id=${id}) stock unavailable!!!`))
        }

        if (stockAvailable < 40) {
            return new Failure(new UpdateStockErrorHandler('insuffisientStock', `Product(id=${id}) stock cannot be updated`))
        }
        
        this.stockRepository.updateStock(product.ID, stock)
        
        return new Success({
            productId: product.ID,
            newStock: stock
        })

    }

}
```
Y ahora cuando invocamos el servicio de productos Obtendremos nuestro objeto Result (patron Either)

```typescript

const productId = 'ab351bc97d'
const result = productService.updateStock(productId, 20)

if (result.isSuccess()) {
    result.success
} else {
    result.error.match({
        insuffisientStock:(msg: string) => {
            alertService.sendAlert(msg)
        },
        productNotFound: (msg: string) => {
            // some actions...
        },
        unavailableStock: (msg: string) => {
            // some actions...
        }
    })
}

```
al invocar el metodo match() de Error nos obligara a implementar metodos calbbacks basados en el type error definido previamente.

```typescript
export type ProductErrors = 'unavailableStock' | 'serverError' | 'otherError' 
```

Entonces de esta manera un control de errores mas robusto para la logica principal de la aplicaion, trycatch aun puede ser usado pero con un enfoque en donde las excepciones son tratadas como eventos o errores externos a la logica de negocio principal.


## Conclusiones

