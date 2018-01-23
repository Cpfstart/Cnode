import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store=new Vuex.Store({
    state:{
        topics:[],
        list:[],
        pageNum:1,
        tab:'all',
        loading:false,
        userInfo:{}
    },
    mutations:{
        changeLoading(state,payload){
            state.loading=payload.loading
        },
        changeAll(state,payload){
            state.topics=payload.topics
            state.tab=payload.tab
            state.loading=payload.loading
        },
        changeGood(state,payload){
            state.tab=payload.tab
            state.loading=payload.loading
        },
        changeShare(state,payload){
            state.tab=payload.tab
            state.loading=payload.loading
        },
        changeAsk(state,payload){
            state.tab=payload.tab
            state.loading=payload.loading
        },
        changeJob(state,payload){
            state.tab=payload.tab
            state.loading=payload.loading
        },
        changeDev(state,payload){
            state.tab=payload.tab
            state.loading=payload.loading
        },
        infoChange(state,payload){
            state.id=payload.id
            state.list=payload.list
            state.loading=payload.loading
        },
        setUserInfo(state, payload) {
            state.userInfo = payload.userInfo
        }
    },
    actions :{
        getListAction({ commit }, payload={pageNum:1}){
           setTimeout(()=>{
            Axios.get('/api/v1/topics',{
                params:{
                    page:payload.pageNum,        //显示第几页
                    limit:10,                       //每页有多少条数据
                    tab:this.state.tab,            //切换获取的数据
                }
            }).then((prams)=>{
                commit('changeAll', { topics: prams.data.data })
                commit('changeLoading',{ loading: true })
            })
           },1000)
        },
        listAction({commit},payload){
            setTimeout(()=>{
                Axios.get('/api/v1/topic/'+payload.id)
                .then((res)=>{
                    commit('infoChange', { list: res.data.data })
                    commit('changeLoading',{ loading: true })
                })
            })
        },
        setUserInfo ({commit}, user) {
            commit('setUserInfo', user)
          }
    }
})
export default store;