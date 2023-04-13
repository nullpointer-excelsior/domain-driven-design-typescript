import { Product } from "./Product";
import { ProductID } from "./ProductID";

export class ProductRepository  {

    private products: Product[] = [
       
    ]

    findById(productID: ProductID) {
        return this.products.find(p => p.ID.equals(productID))
    }
    
}