import { Failure, Result, Success } from "../../../shared/seedwork/libs/Result";
import { ProductID } from "../domain/ProductID";
import { ProductRepository } from "../domain/ProductRepository";
import { StockService } from "../domain/StockService";
import { UpdateStockErrorHandler } from "./UpdateStockErrorHandler";



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



const productService = new ProductService(new ProductRepository(), new StockService())

const result = productService.updateStock('33', 20)

if (result.isSuccess()) {
    result.success
} else {
    result.error.match({
        insuffisientStock:(msg: string) => {
            
        },
        productNotFound: (msg: string) => {

        },
        unavailableStock: (msg: string) => {

        }
    })
}