import Vue from 'vue';
import Vuex from 'vuex';
import { request } from '../common/request';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        listProducts: [],
        shopCart: []
    },
    mutations: {
        loadProducts(state, products){
            state.listProducts = products;
        },
        addProductToCart(state, products){
            state.shopCart.push(products);
        },
        deleteProductFromCart(state, newArrProducts){
            state.shopCart = newArrProducts;
        },
        addProduct(state, newArrProducts){
            state.shopCart = newArrProducts;
        }
    },
    actions: {
        async loadProducts(context){
            let res = await request('/', 'GET')
            context.commit('loadProducts', res.data)
        },
        async editFavorite(context, id){
            await request(`/editFavorite/${id}`, 'PUT');
            store.dispatch('loadProducts')
        },
        addProductToCart(context, product){
            const shopCart = store.state.shopCart;
            const match = shopCart.filter(el => el._id === product._id);
            if(match.length){
                let cartProduct = match[0];
                if(cartProduct.amount === cartProduct.quantity){
                    return
                }
                cartProduct.quantity++
            }else{
                context.commit('addProductToCart', product)
            } 
        },
        deleteProductFromCart(context, id){
            const shopCart = store.state.shopCart;
            const newArrProducts = shopCart.filter(el => el._id !== id);
            context.commit('deleteProductFromCart', newArrProducts)
        },
        addProduct(context, id){
            const shopCart = store.state.shopCart;
            for(let element of shopCart){
                if(id === element._id){
                    if(element.amount === element.quantity){
                        return
                    }else{
                        element.quantity++
                        context.commit('addProduct', shopCart)
                    }
                }
            }
        },
        removeProduct(context, id){
            const shopCart = store.state.shopCart;
            for(let element of shopCart){
                if(id === element._id){
                    if(element.quantity === 1){
                        return
                    }else{
                        element.quantity--
                        context.commit('addProduct', shopCart)
                    }
                }
            }
        }
    }
})

export default store

