import { Entity, EntityProps } from "../../../shared/seedwork/Entity";
import { ProductID } from "./ProductID";

interface StoreState {
    name: string;
}

export class Store extends Entity<ProductID>{

    private state: StoreState;

    constructor(props: EntityProps<StoreState>) {
        super(props.id)
        this.state = {
            ...props
        }
    }

    get name() {
        return this.state.name
    }
    
}