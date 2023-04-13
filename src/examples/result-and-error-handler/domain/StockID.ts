import { ID } from "../../../shared/seedwork/ID";
import { Product } from "./Product";
import { Store } from "./Store";

export class StockID extends ID {
    
    constructor(id: string) {
        super(id)
    }

    public static generate(store: Store, product: Product) {
        return new StockID(`${store.ID}-${product.ID}`)
    }
}