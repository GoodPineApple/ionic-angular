import { State, Action, StateContext, Selector } from "@ngxs/store";
import { RecommendProduct } from "../../models/Product";
import {
  AddUpdatedRecommendProduct,
  GetRecommendProduct,
  ClearRecommendProduct
} from "../../actions/marketing/recommend-product.action";
import { MarketingService } from "../../services/marketing/marketing.service";

export class RecommendProductStateModel {
  recommendProductArr: RecommendProduct[];
}

@State<RecommendProductStateModel>({
  name: "recommend_product",
  defaults: {
    recommendProductArr: []
  }
})
export class RecommendProductState {
  constructor(private marketingService: MarketingService) {
    console.log("[recommend-product.state constructor]");
  }

  @Selector()
  static getRecommendProduct(state: RecommendProductStateModel) {
    return state.recommendProductArr;
  }

  @Action(AddUpdatedRecommendProduct)
  addUpdatedRecommendProduct(
    { getState, setState }: StateContext<RecommendProductStateModel>,
    { payload }: AddUpdatedRecommendProduct
  ) {
    console.log("[recommend-product.state AddUpdatedRecommendProduct]");
    const state = getState();

    setState({
      recommendProductArr: [...state.recommendProductArr, payload]
    });
  }

  @Action(GetRecommendProduct)
  getRecommendProduct({ getState }: StateContext<RecommendProductStateModel>) {
    const state = getState();
    return state.recommendProductArr;
  }

  @Action(ClearRecommendProduct)
  clearRecommendProduct({
    setState
  }: StateContext<RecommendProductStateModel>) {
    setState({ recommendProductArr: [] });
  }
}
