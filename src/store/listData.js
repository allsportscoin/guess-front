import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

const state = {
    earlierMatchesListData: [],
    betListData: [],
    detailData:{},
    qrDetail:{},
    chooseTog: 'bet'
};
const mutations = {
    saveBetList (state, data) {
        state.betListData = data;
    },
    saveEarlierMatchesList (state, data) {
        state.earlierMatchesListData = data;
    },
    chooseToggle (state, data) {
        if (data === 'bet'){
            state.chooseTog = 'bet';
        } else if (data === 'earli') {
            state.chooseTog = 'earli';
        }
    },
    gotoDetail (state, detailData) {
        state.detailData = detailData;
    },
    qrDetailFn (state, qrData) {
        state.qrDetail = qrData;
    }
};
const getters = {
    qrData: state => {
        return state.qrDetail;
    },
    detailFinalData: state => {
        return state.detailData;
    },
    toggleSelected: state => {
        return state.chooseTog;
    },
    getBetListData: state => {
        return state.betListData;
    },
    getearlierMatchesListData: state => {
        return state.earlierMatchesListData;
    }
};
const actions = {
    addAllData (context) {
        axios.get(`${HOST}/bet`).then(response => {
            if (response.data.errno === 0) {
                const res = response.data.data;
                let betList = res.list;
                context.commit('saveBetList', betList);
                context.dispatch('addEarliData');
            } else {
                console.log('error');
            }
        });
    },
    addEarliData (context) {
        axios.get(`${HOST}/bet?desc=1`).then(response => {
            if (response.data.errno === 0) {
                const res1 = response.data.data;
                let earlierMatchesList = res1.list;
                context.commit('saveEarlierMatchesList', earlierMatchesList);
            } else {
                console.log('error');
            }
        });
    }
};
export default {
    state,
    mutations,
    actions,
    getters
};
