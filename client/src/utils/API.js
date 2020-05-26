import axios from "axios";

export default {
    getCategories: function () {
        return axios.get('/api/categories')
    },
    getProductsActive: function () {
        return axios.get('/api/products/active')
    },
    getSettings: function(){
        return axios.get('/api/settings')
    }
}

