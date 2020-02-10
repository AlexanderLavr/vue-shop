<template>
  <div class="d-flex flex-wrap">

    <div v-if="swichValue && !productsList.length" class="empty-container">
      <h1>Ничего не выбранно!</h1>
    </div>
    
    <Card 
      v-for="productsList of productsList"
      :key="productsList.id"
      :product="productsList"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Card from '@/components/home/Card';

export default {
  props: ['swichValue', 'selectedProducts'],
  data() {
    return {}
  },
  computed: {
    ...mapState(['listProducts', 'shopCart']),
    productsList() { // filter products
      const getSelectedProducts = this.getSelectedProducts();
      if(this.swichValue) { //filter favorite
        return this.listProducts.filter(prodict => prodict.isFavorite)
      }
      if(getSelectedProducts.length) { //filter selected products
        const selectedProducts = this.filterSelectedProducts();
        return selectedProducts
      }
      return this.listProducts // default value products
    }
  },
  methods: {
    ...mapActions(['loadProducts']),
    getSelectedProducts() { //to filter products
      const selectedTypeProducts = [];
      for(let i in this.selectedProducts){
        let selected = this.selectedProducts[i];
        if(selected){
          selectedTypeProducts.push(i)
        }
      }
      return selectedTypeProducts
    },
    filterSelectedProducts() { //to filter products
      const getSelectedProducts = this.getSelectedProducts();
      let selectedProducts = [];
      getSelectedProducts.map(type => {
        let typeProducts = this.listProducts.filter(prodict => prodict.type === type)
        selectedProducts = selectedProducts.concat(typeProducts)
      })
      return selectedProducts
    }
  },
  mounted(){
    this.loadProducts(); //download products from server
  },
  components: {
    Card
  }
}
</script>
