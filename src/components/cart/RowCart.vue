<template>
    <div class="cart-row">
        <v-btn color=primary @click="clear">
            <v-icon>clear</v-icon>
        </v-btn>
        <div 
            :style="{ background: `url(${product.image})` }"  
            class="cart-image img-container"
        ></div>
        <v-btn color=primary @click="add" class="mx-4">
            <v-icon>add</v-icon>
        </v-btn>
        
        <div class="mx-4 price">{{product.quantity}} шт.  *   {{product.price}} грн.</div>

        <v-btn color=primary @click="remove" class="mx-4">
            <v-icon>remove</v-icon>
        </v-btn>

        <div class="mx-4 price">{{priceProduct}} грн.</div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    props: ['product'],
    methods: {
        ...mapActions(['deleteProductFromCart', 'addProduct', 'removeProduct']),
        clear() {
            const id = this.product._id;
            this.deleteProductFromCart(id)
        },
        add() {
            const id = this.product._id;
            this.addProduct(id)
        },
        remove() {
            const id = this.product._id;
            this.removeProduct(id)
        }
    },
    computed: {
        ...mapState(['shopCart']),
        priceProduct() {
            return this.product.quantity * this.product.price
        }
    }
}
</script>