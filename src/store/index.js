import Vuex from 'vuex';
import Vue from 'vue';
import listData from './listData';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        listData
    }
});
