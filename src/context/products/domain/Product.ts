import { DomainException } from "../../../shared/seedwork/DomainException";
import { EntityProps, StatefulEntity } from "../../../shared/seedwork/libs/StatefulEntity";
import { ProductId } from "./ProductId";

interface ProductState {
    name: string;
    stock: number;
}

export class Product extends StatefulEntity<ProductId, ProductState> {

    constructor(props: EntityProps<ProductState>) {
        super(props)
        this.state.addBeforeUpdateListener((state: ProductState) => {
            if (state.stock < 0) {
                throw new DomainException('this item cannot have a negative stock')
            }
        })
    }

    updateStock(stock: number) {
        
        this.state.reduce(state => {
            state.stock = stock
            return state
        })

    }

}