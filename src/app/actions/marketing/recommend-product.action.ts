import { RecommendProduct } from "../../models/Product";

export class AddUpdatedRecommendProduct {
  static readonly type = "[Recommend-Product] Add";

  constructor(public payload: RecommendProduct) {}
}

export class GetRecommendProduct {
  static readonly type = "[Recommend-Product] Get";

  constructor() {}
}

export class ClearRecommendProduct {
  static readonly type = "[Recommend-Product] Clear";

  constructor() {}
}
