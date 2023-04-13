import { Product } from "./Product";
import { Stock } from "./Stock";
import { StoreID } from "./StoreID";

export class StoreRepository {
    
    private stocks: Stock[] = [
        // new Stock({
        //     id: new StoreID('1-1111'),
        //     orders: 10,
        //     product: new Product(),
        //     stock: 100,
        //     store: null,
        //     transit: 0
        // })
    ]

    findById(id: StoreID) {
        return []
    }

}