import { defineStore } from 'pinia'
import AppDataSource from '../plugins/typeorm-sqlite'
import { toRaw } from "vue";


function formatProduct(payload){
    const res = [];

    // console.log(payload)
    payload.forEach(item => {
        let data = JSON.parse(item.product_data)
        res.push({
            product_id: item.product_id,
            id: item.id,
            product_data: data,
            status: item.status
        })
    })

    return res
}

export const useProductStore = defineStore('product', {
    state: () => ({
        page: 1,
        limit: 10,
        datas: null
    }),
    actions: {
        async setToStore(){
            
            AppDataSource.query(`SELECT * FROM product_cache LIMIT ${this.limit} OFFSET ${this.page - 1}`)
            .then(res => {
                console.log(res)
                this.$state.datas = formatProduct(res)
            });
        },
        async setProduct(payload){
            const {productId, productData, productStatus} = payload

            const q = await AppDataSource.query(`INSERT INTO product_cache(product_id, product_data, status) VALUES("${productId}", '${JSON.stringify(productData)}', ${productStatus})`);

            if(q == 1){
                console.log("berhasil")
            }
        }
    },
    getters: {
        getProducts: (state) => toRaw(state.datas)
    }
})
