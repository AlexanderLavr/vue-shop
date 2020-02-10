<template>
  <v-card
    class="mx-auto my-3 card-btn-margin-x"
    max-width="300"
    min-width="300"
  >
    <div 
      height
      :style="{ background: `url(${product.image})` }"
      class="card-img img-container mx-4 my-4"
    ></div>
    <v-card-title class="subtitle-1">{{product.title}}</v-card-title>

    <v-card-text class="text--primary card-text">
      <div>{{product.description.substr(0, 140) + '...'}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        :id="product._id"
        @click="changeFavorite"
        text
      >
        {{ product.isFavorite? 'remove favorite': 'add favorite' }}
      </v-btn>

      <v-btn
        color="orange"
        @click="addToCard"
        text
      >
        To cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
      return {
          
      }
  },
  props: {
    product: {
        type: Object,
        required: true
    }
  },
  methods: {
    ...mapActions(['editFavorite', 'addProductToCart']),
    changeFavorite(e) { //event on favorite button
      let element = e.currentTarget;
      const id = element.id;
      this.editFavorite(id);
    },
    addToCard() {
      let productToCart = {...this.product, quantity: 1 };
      this.addProductToCart(productToCart)
    }
  }
}
</script>