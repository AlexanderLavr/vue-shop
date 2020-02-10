<template>
  <div>
    <v-app>
      <Header 
        @swich-value="getSwichValue"
        @selected-type-products="selectedTypeProducts"
      />
      <router-view 
        :swichValue="swichValue"
        :selectedProducts="selectedProducts"
      >
      </router-view>
    </v-app>
  </div>
</template>

<script>
import Header from '@/components/header/Header';
export default {
  data() {
    return {
      swichValue: false,
      selectedProducts: {}
    }
  },
  methods: {
    getSwichValue(value){
      this.swichValue = value;
    },
    selectedTypeProducts(value) {
      this.selectedProducts = { ...value };
    }
  },
  components: {
    Header
  }
}
</script>