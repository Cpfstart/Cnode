<template>
  <div style="padding: 40px 0; flex: 1"  name="name">
      <Row style="min-height: 100%">
            <i-col :xxl="4" :xl="5" :lg="5" :md="6" :xs="0" :sm="0">
              <Menu
                class="item-Menu"
                active-name="1"
              >
                <Menu-item name="1">
                  <div @click="all">全部</div>
                </Menu-item>
                <Menu-item name="2">
                  <div @click="good">精华</div>
                  </Menu-item>
                <Menu-item name="3">
                  <div @click="share">分享</div>
                  </Menu-item>
                <Menu-item name="4">
                  <div @click="ask">问答</div>
                </Menu-item>
                <Menu-item name="5">
                  <div @click="job">招聘</div>
                  </Menu-item>
                <Menu-item name="6">
                  <div @click="dev">测试</div>
                  </Menu-item>
              </Menu>
            </i-col>
            <i-col :xxl="0" :xl="0" :lg="0" :md="0" :xs="24" :sm="24">
              <Menu
                mode="horizontal"
                style="paddingLeft: 10vw;z-index:1"
                active-name="1"
              >
               <Menu-item name="1">
                  <div @click="all">全部</div>
                </Menu-item>
                <Menu-item name="2">
                  <div @click="good">精华</div>
                  </Menu-item>
                <Menu-item name="3">
                  <div @click="share">分享</div>
                  </Menu-item>
                <Menu-item name="4">
                  <div @click="ask">问答</div>
                </Menu-item>
                <Menu-item name="5">
                  <div @click="job">招聘</div>
                  </Menu-item>
                <Menu-item name="6">
                  <div @click="dev">测试</div>
                  </Menu-item>
              </Menu>
            </i-col>
            <i-col :xxl="20" :xl="19" :lg="19" :md="18" :xs="24" :sm="24" style="padding-left: 20px; padding-right: 12vw; border-left: 1px solid #e9e9e9">
            <div v-if="!this.$store.state.loading"><Loding></Loding></div>
            <div v-if="this.$store.state.loading">
              <topic-list></topic-list>
            </div>
            </i-col>
          </Row>
        </div>
</template>

<script>
import Loding from '../loding'
import topicList from './topic-list'
export default {
  components:{
    Loding,
    topicList
  },
  methods:{
    all(){
      this.$store.commit('changeAll',{tab:'all'})
      this.$store.dispatch('getListAction')
    },
    good(){
      this.$store.commit('changeGood',{tab:'good'})
      this.$store.dispatch('getListAction')
    },
    share(){
      this.$store.commit('changeShare',{tab:'share'})
      this.$store.dispatch('getListAction')
    },
    ask(){
      this.$store.commit('changeAsk',{tab:'ask'})
      this.$store.dispatch('getListAction')
    },
    job(){
      this.$store.commit('changeJob',{tab:'job'})
      this.$store.dispatch('getListAction')
    },
    dev(){
      this.$store.commit('changeDev',{tab:'dev'})
      this.$store.dispatch('getListAction')
    },
    
    
  },
  mounted(){
    
    this.$store.dispatch('getListAction')
  }
  
}
</script>

<style>


.item-Menu{
  line-height: 64px; 
  border: none;
  text-align: center 
}
.list{
  position: relative;
}
.list-item{
  border-bottom: 1px solid #e8e8e8;
  align-items: center;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
}
.item-left{
    align-items: flex-start;
    display: -ms-flexbox;
    display: flex;
    font-size: 0;
    color:#46ddf1;
    
}
.item-left-avatar{
  width: 32px;
  height: 32px;
  margin-right: 16px;
}
.item-left-avatar img{
  width: 100%;
 
}

.item-left-content{
      flex: 1 0;
      margin-left:10px 
}
.item-contents{
  display: flex;
    flex: 1 1;
    justify-content: flex-end;
}
.content-title{
      color: rgba(0, 0, 0, 0.65);
    margin-bottom: 4px;
    font-size: 14px;
    line-height: 22px;
}
.content-title span{
  padding: 2px;
  border-radius:4px;
  border:1px solid yellowgreen;
  background: yellowgreen;
  color:#fff;
}
.content-description{
  color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
}
.item-right{
    flex: 0 0 auto;
    margin-left: 48px;
    padding: 0;
    list-style: none;
}
.item-right li {
  float: left;
  padding-left:10px;
  padding-right:10px;
  margin-right:5px; 
}
.action-split{
  background-color: #e8e8e8;
    margin-top: -7px;
    position: absolute;
    top: 50%;
    right: 0;
    width: 1px;
    height: 14px;
}
        
</style>
