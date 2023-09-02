<script setup>
import { useProductStore } from '@/stores/product'
const store = useProductStore()

store.setToStore()

const products = store.getProducts


</script>
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Resources</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Resources</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">
        
        <ion-list v-show="store.datas.length > 0" v-for="item in store.datas" :inset="true">

          <ion-item>
            <ion-icon :icon="ioniconsBookOutline" slot="start"></ion-icon>
            <ion-label><a target="_blank" rel="noopener noreferrer" href="https://ionic.nuxtjs.org/">
                {{ item.product_data.title }}</a></ion-label>
          </ion-item>
         
        </ion-list>
        <ion-button router-link="/">Back</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>
  
<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>