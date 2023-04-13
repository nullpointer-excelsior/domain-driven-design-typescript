import { Entity, EntityProps } from "../../../shared/seedwork/Entity";
import { ProductID } from "./ProductID";

interface ProductState {
    name: string;
    description: string;
    stock: number;
}

export class Product extends Entity<ProductID>{

    public stock: number = 0;
    private state: ProductState;

    constructor(props: EntityProps<ProductState>) {
        super(props.id)
        this.state = {
            ...props
        }
    }

    updateStock(stock: number) {
        this.state.stock = stock
    }

    // get stock() {
    //     return this.state.stock
    // }

}