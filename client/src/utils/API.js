import axios from "axios";

export default {    
    getProductsActive: function(){
        return axios.get('/api/products/active')
    } 
}

