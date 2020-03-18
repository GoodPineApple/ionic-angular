import { Product } from "../../models/Product";

export class AddProduct {
  static readonly type = "[Product] Add";
  constructor(public payload: any) {}
}

export class GetProductView {
  static readonly type = "[Product] Get Product View";
  constructor(public groupId: string, public productId: string) {}
}

export class GetProductArr {
  static readonly type = "[Product] Get Product Arr";
  constructor(public groupId: string) {}
}

export class UpdateProduct {
  static readonly type = "[Product] Update";

  constructor(public payload: any, public id: number) {}
}

export class DeleteProduct {
  static readonly type = "[Product] Delete";

  constructor(public id: number) {}
}

export class SetSelectedProduct {
  static readonly type = "[Product] Set";

  constructor(public payload: Product) {}
}
