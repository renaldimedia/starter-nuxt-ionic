import { defineStore } from 'pinia'
import AppDataSource from '../plugins/typeorm-sqlite'

export const useMainStore = defineStore('main', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})

async function getProducts(limit, offset = 0) {
  const rawData = await AppDataSource.query(`SELECT * FROM product_cache LIMIT ${limit} OFFSET ${offset - 1}`);

  return rawData;
}

export const useProductStore = defineStore('product', () => {
  const page = ref(1)
  const limit = ref(10)
  const datas = ref([])

  const getData = computed(async () => await getProducts(limit.value, page.value))

  return {page, limit, getData, datas}
});