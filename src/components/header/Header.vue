<template>
    <div>
        <Draver 
            ref="drawerRef"
            @swich-value="getSwichValue"
            @selected-type-products="selectedTypeProducts"
        />
        <v-app-bar
            color="primary"
            dense
            light
        >
            <v-app-bar-nav-icon class="header-normal" @click="showDrawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="header-normal">Test vue shop</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
    </div>
</template>

<script>
import Draver from '@/components//header/Drawer';

export default {
    data() {
        return { 
            switch1: false
        }
    },
    mounted() {
        
    },
    methods: {
        showDrawer(){
            this.$refs.drawerRef.toggleDrawer()
        },
        getSwichValue(value) {
            this.$emit('swich-value', value)
        },
        selectedTypeProducts(value) {
            this.$emit('selected-type-products', value)
        }
    },
    components: {
        Draver
    }
}
</script>