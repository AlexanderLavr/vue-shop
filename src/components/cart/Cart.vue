<template>
    <div>
        <div 
            v-if="shopCart.length"
        >
            <RowCart 
                v-for="product of listShopCart" 
                :key="product._id"
                :product="product"
            />
            <h2 class="total">Total count: {{totalCount}}</h2>
        </div>
        <div v-else class="empty-container">
            <h1>Ничего не выбранно!</h1>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import RowCart from '@/components/cart/RowCart';

export default {
    computed: {
        ...mapState(['shopCart']),
        listShopCart() {
            return this.shopCart
        },
        totalCount() {
            let count = 0;
            this.shopCart.map(el => {
                count += el.quantity * el.price;
            })
            return count
        }
    },
    components: {
        RowCart
    }
}
</script>