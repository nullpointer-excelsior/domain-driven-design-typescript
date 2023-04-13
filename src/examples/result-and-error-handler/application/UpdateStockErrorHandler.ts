import { ErrorHandler } from "../../../shared/seedwork/libs/ErrorHandler";

type Errors = 'unavailableStock' | 'insuffisientStock' | 'productNotFound'

export class UpdateStockErrorHandler extends ErrorHandler<Errors>{

}