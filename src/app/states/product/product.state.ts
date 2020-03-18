import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Product} from '../../models/Product';
import {AddProduct, DeleteProduct, GetProductView, GetProductArr, SetSelectedProduct, UpdateProduct} from '../../actions/product/product.action';
import {ProductService} from '../../services/product/product.service';
import {tap} from 'rxjs/operators';
import _ from "lodash";

export class ProductStateModel {
    productArr: Object[];
    selectedProduct: Product;
}

@State<ProductStateModel>({
    name: 'product',     // must be unique
    defaults: {
        productArr: [],
        selectedProduct: null
    }
})
export class ProductState {

    constructor(private productService: ProductService) {
        console.log("[product.state constructor]");
    }
    // @Selector()
    // static getProductView(state: ProductStateModel) {
    //     console.log("product.state getProductArr");
    //     return state.productArr;
    // }

    @Selector()
    static selectProductArr(state: ProductStateModel) {
        // return state.productArr;
        console.log("product.state selectProductArr");
        return (groupId: string) => { //<--- Return a function from select
            var productArr = [];
            let productStateArr = state.productArr;
            _.forEach(productStateArr, (productState) => {
                if(productState["groupId"] == groupId){
                    let productItemArr = productState["product"];
                    _.forEach(productItemArr, (productItem) => {
                        productArr.push(productItem);
                    })
                }
            })
            return productArr;
        };
    }

    @Selector()
    static selectSelectedProduct(state: ProductStateModel) {
        return state.selectedProduct;
    }

    @Action(GetProductView)
    async getProductView({getState, setState}: StateContext<ProductStateModel>, {groupId,productId}: GetProductView) {
        console.log("[product.state GetProductView]")
        var result = await this.productService.getProductByProductId(productId);
        const state = getState();
        // setState({
        //     ...state,
        //     productArr: result
        // })
        return result;
    }

    @Action(GetProductArr)
    async getProductArr({getState, setState}: StateContext<ProductStateModel>, {groupId}: GetProductArr) {
        console.log("[product.state getProductArr]")
        var result = await this.productService.getProductArr(groupId);
        const state = getState();
        let productStateArr = state.productArr;
        var productStateItem = {
                groupId : groupId,
                product : result
        }
        productStateArr.push(productStateItem);
        setState({
            ...state,
            productArr: productStateArr
        })
        return result;
    }

    @Action(AddProduct)
    async addProduct({getState, patchState}: StateContext<ProductStateModel>, {payload}: AddProduct) {
        console.log("[product.state addProducts]");
        var result = await this.productService.addProduct(payload);
        const state = getState();
        let productStateArr = state.productArr;
        _.forEach(productStateArr, (productState) => {
            if(productState.groupId == result.groupId){
                productState.product.unshift(result)
            }
        })
        console.log(productStateArr)
        patchState({
            productArr: productStateArr
        });
    }

    @Action(UpdateProduct)
    updateProduct({getState, setState}: StateContext<ProductStateModel>, {payload, id}: UpdateProduct) {
        console.log("[product.state updateProduct]");
        return this.productService.updateProduct(payload, id).pipe(tap((result) => {
            const state = getState();
            const productArr = [...state.productArr];
            // const productIndex = productArr.findIndex(item => item.id === id);
            // productArr[productIndex] = result;
            const productIndex = 0;
            productArr[productIndex] = result;
            setState({
                ...state,
                productArr: productArr,
            });
        }));
    }


    @Action(DeleteProduct)
    deleteProduct({getState, setState}: StateContext<ProductStateModel>, {id}: DeleteProduct) {
        console.log("[product.state deleteProduct]");
        return this.productService.deleteProduct(id).pipe(tap(() => {
            const state = getState();
            // const filteredArray = state.productArr.filter(item => item.id !== id);
            // const filteredArray = state.productArr.filter(item => item.productName !== "1");
            const filteredArray = state.productArr;
            setState({
                ...state,
                productArr: filteredArray,
            });
        }));
    }

    @Action(SetSelectedProduct)
    async setSelectedProduct({getState, setState}: StateContext<ProductStateModel>, {payload}: SetSelectedProduct) {
        console.log("[product.state setSelectedProductId]");
        const state = getState();
        setState({
            ...state,
            selectedProduct: payload
        });
    }
}

