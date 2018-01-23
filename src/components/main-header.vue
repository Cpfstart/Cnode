<template>
    <div style="box-shadow:2px 2px 5px #eee;position:relative">
        <Row>
            <Col :xxl="4" :xl="5" :lg="5" :md="6" :xs="24" :sm="24">
                <h2 style="text-align:center;height:58px;line-height:58px">CNode</h2>
            </Col>
            <Col :xxl="20" :xl="19" :lg="19" :md="18" :xs="0" :sm="0">
                <div style="border-left:1px solid #ccc;height:58px;float:left;width:0"></div>
                <Menu mode="horizontal" :theme="theme1" active-name="1" style="float:left">
                    <Menu-item name="1">
                        <router-link to='/'>
                            <Icon type="home" />
                            主页
                        </router-link>
                    </Menu-item>
                    <Menu-item name="2">
                        <router-link to='/newTopic'>
                            <Icon type="ios-book"/>
                            发布
                        </router-link>
                    </Menu-item>
                    <Menu-item name="3">
                        <router-link to='/about'>
                            <Icon type="ios-information"/>
                            关于
                        </router-link>
                    </Menu-item>
                 </Menu>
                 <div style="float:right;padding-right:90px;line-height:58px" v-if="!this.$store.state.userInfo">
                     <router-link to="/login" style="marginRight: 2px"><Icon type="user" />登陆</router-link>
                 </div>
                 <div v-else style="float:right;padding-right:90px;line-height:58px">
                     <Dropdown style="margin-left: 20px">
                        <router-link to="/login">
                            <Avatar icon="person" /><span style="margin-left:10px;font-size:18px">{{this.$store.state.userInfo.loginname}}</span>
                        </router-link>
                        <Dropdown-menu slot="list">
                            <Dropdown-item>
                              <router-link to="/newTopic">发布话题</router-link>
                            </Dropdown-item>
                            <Dropdown-item>
                                <router-link to="/login">用户中心</router-link>
                            </Dropdown-item>
                            <Dropdown-item>
                              <router-link to="/login">
                                <div @click="logout">退出登陆</div>
                              </router-link>
                            </Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                 </div>
            </Col>
        </Row>
        <Row style="position: absolute; right: 50px; top: 16px;">
            <Col :xxl="0" :xl="0" :lg="0" :md="0" :xs="24" :sm="24">
              <Dropdown>
                <Button>
                    <Icon type="navicon-round"></Icon>
                </Button>
                <Dropdown-menu slot="list" style="text-align:center">
                    <Dropdown-item>主页</Dropdown-item>
                    <Dropdown-item>
                        <router-link to='/newTopic'>发布</router-link>
                    </Dropdown-item>
                    <Dropdown-item>关于</Dropdown-item>
                    <Dropdown-item>
                        <router-link to="/login">
                            <Avatar icon="person" /><span style="margin-left:10px;font-size:18px">Lxz</span>
                        </router-link>
                    </Dropdown-item>

                </Dropdown-menu>
            </Dropdown>
            </Col>
          </Row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            theme1: 'light',
            userContent:'',
        }
    },
    methods:{
        logout(){
            localStorage.clear()
          window.location.reload()
        }
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

<style>
a{
    color: #333
}

</style>
