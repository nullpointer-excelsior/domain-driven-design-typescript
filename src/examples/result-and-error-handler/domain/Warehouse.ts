import { Entity, EntityProps } from "../../../shared/seedwork/Entity";
import { ProductID } from "./ProductID";

interface WarehouseState {
    name: string;
}

export class Store extends Entity<ProductID>{

    private state: WarehouseState;

    constructor(props: EntityProps<WarehouseState>) {
        super(props.id)
        this.state = {
            ...props
        }
    }

    get name() {
        return this.state.name
    }
    
}