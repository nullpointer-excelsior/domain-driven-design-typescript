import { Entity, EntityProps } from "../../../shared/seedwork/Entity";
import { Product } from "./Product";
import { StockID } from "./StockID";
import { Store } from "./Store";

interface StockState {
    store: Store;
    product: Product;
    stock: number;
    orders: number;
    transit: number;
}

export class Stock extends Entity<StockID>{

    private state: StockState;

    constructor(props: EntityProps<StockState>) {
        super(props.id)
        this.state = {
            ...props
        }
    }

    get store() {
        return this.state.store
    }

    get product() {
        return this.state.product
    }
    
    get stock() {
        return this.state.stock
    }
    
}