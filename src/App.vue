<template>
  <div id="app">
    <main-header></main-header>
    <!-- <topic-nav></topic-nav> -->
    <router-view></router-view>
    <main-footer></main-footer>
  </div>
</template>

<script>
import axios from 'axios'
import mainHeader from './components/main-header'
import mainFooter from './components/main-footer'
import topicNav from './components/topic/topic-nav'

export default {
  name:'app',
  components: {
    mainHeader,
    mainFooter,
    topicNav
  },
  beforeCreate(){
        if(localStorage.getItem("data")){
            this.$store.state.userInfo=JSON.parse(localStorage.data)
            axios.get('https://cnodejs.org/api/v1/user/' + this.$store.state.userInfo.loginname).then((response) => {
              this.userContent = response.data.data 
            })
        }
    }
}
</script>

<style lang="sass">

</style>
