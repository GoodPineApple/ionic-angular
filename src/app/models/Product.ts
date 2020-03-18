export interface Product {
  id: string;
  productName: string;
  productImgUrl: string;
  status: string;
  groupId: string;
  productPrice: string;
  productCurrency: string;
  productOption: string;
  productDetail: string;
  shopSiteName: string;
  shopSiteUrl: string;
  profileId: string;
  shopId: string;
  createUid: number;
  updateUid: number;
  createDate: Object;
  updateDate: Object;
}

export interface RecommendProduct {
  groupId: string;
  id: string;
  productCurrency: string;
  productDetail: string;
  productName: string;
  productOption: string;
  productPrice: string;
  productImgUrl: string;
  shopSiteName: string;
  shopSiteUrl: string;
  status: string;
  votedNum?: number;
  isVoted?: boolean;
}
