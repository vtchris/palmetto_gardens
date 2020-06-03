import axios from "axios";

export default {
    getArticles: function(sort){
        return axios.get('/api/articles')
    },
    getCategories: function () {
        return axios.get('/api/categories')
    },
    getProductsActive: function () {
        return axios.get('/api/products/active')
    },
    getSettings: function(){
        return axios.get('/api/settings')
    },
    postEmail: function(emailOptions){
        return axios.post('/api/email', emailOptions)
    }
}

