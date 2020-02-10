<template>
    <v-sheet
        height="100%"
        class="overflow-hidden"
        absolute
    >
        <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
            >
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Test Shop</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>

                <v-list-item
                    v-for="type of getTypeProducts"
                    :key="type"
                    :class="{active: typeProducts[type]}"
                    @click="toggleDrawer"
                    link
                >
                    <v-list-item-content  @click="selectCategory">
                        <v-list-item-title class="px-4">{{ type }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-container>
                <v-switch
                    v-model="swichFavorite"
                    label="Favorite"
                    color="primary"
                    hide-details
                    @change="toggleSwich"
                    class="my-5 mx-5"
                ></v-switch>
            </v-container>
            <v-container>
                <v-btn 
                    icon  
                    large class="my-5 mx-5"
                    @click="toCart"
                >
                    <v-badge
                        v-if="cartCount"
                        bordered
                        :content="cartCount"
                    >
                        <v-icon color=primary>add_shopping_cart</v-icon>
                    </v-badge>
                    <v-icon v-if="!cartCount" color=primary>add_shopping_cart</v-icon>
                </v-btn>
            </v-container>
        </v-navigation-drawer>
    </v-sheet>  
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            drawer: false,
            swichFavorite: false,
            typeProducts: {}
        }
    },
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
        toggleSwich() {//watch change swich
            this.$emit('swich-value', this.swichFavorite)
        },
        selectCategory(e) {//select product category add watch change
            this.toggleDrawer()
            const element = e.target;
            let value = element.firstChild.textContent;
            this.typeProducts[value] = !this.typeProducts[value];
            
            this.$emit('selected-type-products', this.typeProducts)
        },
        setDinamicState(){
            if(this.getTypeProducts().length){
                this.getTypeProducts().map(el=>{
                    this.typeProducts[el] = false;
                })
            }
        },
        toCart() {
            const history = this.$router.history;
            history.push('/cart')
        }
    },
    computed: {
        ...mapState(['listProducts', 'shopCart']),
        getTypeProducts() {//get products and take products type
            let arrTypeProducts = [];
            let products = this.listProducts;
            products.map(el=>{
                if(arrTypeProducts.indexOf(el.type) === -1 ){
                    arrTypeProducts.push(el.type)
                }
            })
            return arrTypeProducts
        },
        cartCount() {    
            let totalCount = 0;
            this.shopCart.map(el => {
                totalCount += el.quantity;
            })
            return totalCount
        }
    }
}
</script>