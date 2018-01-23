<template>
  <div>
      <div class="inner" v-if="!this.$store.state.userInfo">
    <div class="use">
        <span>token</span>
        <input type="password" v-model="userToken">
    </div>
    <div class="status">
        <button @click="login">登录</button>
    </div>
  </div>
  <div class="content" v-if="this.$store.state.userInfo">
    <input class="logout" title="退出" type="button" value="退出" @click="logout">
    <div class="fistContent">
        <div class="avator">
        <img :title="userContent.loginname" :src="userContent.avatar_url">
        </div>
        <div class="userdetail">
            <h3>{{userContent.loginname}}</h3>
            <p><i class="fa fa-github fa-2x"></i>&nbsp;用户名：{{userContent.githubUsername}}</p>
            <p>
            <span>创建时间：{{formatDate(userContent.create_at)}}</span>
            &nbsp;&nbsp;
            <span>积分：{{userContent.score}}</span>
            </p>
            </div>
        </div>
    <div class="newTheme">
        <nav>
            <ul>
                <li :class="{ active : isActive==='a'}"  @click="talkA('a')">最近创建的话题</li>
                <li :class="{ active : isActive==='b'}"  @click="talkB('b')">最近参与的话题</li>
                <li :class="{ active : isActive==='c'}"  @click="talkC('c')">收藏的话题</li>
            </ul>
        </nav>
        <div class="othertopic">
            <div v-if="articleItems.length !== 0" class="article" v-for="article in articleItems">
              <div class="articleAvator">
                <img :title="article.author.loginname" :src="article.author.avatar_url">
              </div>
              <div class="articleTitle">
                <p>{{article.author.loginname}}<i>{{article.last_reply_at}}更新</i></p>
                <h2><router-link :to="'/topic/'+article.id" :title="article.title">{{article.title}}</router-link></h2>
              </div>
            </div>
            <div v-if="articleItems.length === 0" class="userTips">
              <h2>暂无内容哦。。。🙃</h2>
            </div>
          </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
      return {
         userToken: '',
         userContent:'',
         isActive: 'a',
         articleItems: ''
      }
  },
  methods:{
      login(){
          if(this.userToken===''){
            alert(111)
            return false
          }
        let _this = this;
          axios.post('/api/v1/accesstoken', {
            accesstoken: _this.userToken
          }).then((response) =>{
              let user = {
                loginname: response.data.loginname,
                avatar_url: response.data.avatar_url,
                userId: response.data.id,
                token: _this.userToken
            }
            //将验证后得到的的信息存到localstore中
              window.localStorage.setItem('data',JSON.stringify(user))
              _this.$store.dispatch('setUserInfo', user)
              _this.$store.state.userInfo=user
              //再次获取用户的信息 储存到userContent中
              axios.get('/api/v1/user/' + _this.$store.state.userInfo.loginname).then((response) => {
              _this.userContent = response.data.data
              
            })
          }).catch(()=>{
              alert('token码不正确')
          })
      },
      //获取用户详情 recent_topics储存的是用户的发布的主题，recent_replies是储存的是参与的话题
      talkA(value){
          axios.get('/api/v1/user/' + this.$store.state.userInfo.loginname).then((response)=>{
              console.log(response)
              this.isActive=value
              this.articleItems=response.data.data.recent_topics
          })
      },
      talkB(value){
          axios.get('/api/v1/user/' + this.$store.state.userInfo.loginname).then((response)=>{
              console.log(response)
              this.isActive=value
              this.articleItems=response.data.data.recent_replies
          })
      },
      //获取用户所收藏的主题
      talkC(value){
          axios.get('/api/v1/topic_collect/' + this.$store.state.userInfo.loginname).then((response)=>{
              console.log(response)
              this.isActive=value
              this.articleItems=response.data.data
          })
      },
      logout(){
          localStorage.clear()
          window.location.reload()
      },
      formatDate(date){
            if(date){
                return date.split('T').join(' ').split('.')[0]
            }
           
        }
  },
    beforeCreate(){
        console.log(this.$store.state)
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
    .inner{
        width: 500px;
        padding: 10px;
        border-radius: 0 0 3px 3px ;
        margin: 100px auto
    }
    .use{
        width: 100%;
        height: 50px;
        margin-bottom:10px;
    }
    .use span{
        display: inline-block;
        width: 75px;
        float: left;
        text-align: right;
        padding-right: 20px;
        font:16px/40px "微软雅黑"
    }
    .use input{
        width: 380px;
        height: 40px;
        border: 1px solid #000;
        float: right;
        border-radius: 3px;
        margin-right: 10px
    }
    .use input:focus{
        border: 1px solid rgb(16, 133, 243)
    }
    .status{
        text-align: center
    }
    .status button{
        width: 100px;
        height: 50px;
        background: rgb(247, 246, 246);
        font:18px/50px "微软雅黑";
        border:none;
        margin: 0 10px;
        border-radius: 5px
    }  
    .status button:focus{
        background: rgb(9, 143, 206);
        color:#fff;
        outline: none
    } 
    .content{
    position: relative;
  }
  .logout{
    position: absolute;
    right: 20px;
    top:10px;
    border: none;
    cursor: pointer;
    color: #fff;
    background: #41B883;
    border-radius: 2px;
    padding: 2px 5px;
    outline: none;
  }
  .logout:hover{
    background-color: #006741;
  }
  .fistContent{
    display: flex;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
    margin-top: 20px;
    padding-left: 20px;
  }
  .avator{
    border: 1px solid #ccc;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .avator img{
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .userdetail{
    padding: 0 20px;
  }
  .userdetail h3{
    margin-top: 0;
    margin-bottom: 10px;
  }
  .userdetail p{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .newTheme{
      margin-top:20px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 100px;
        height: 200px;
  }
  nav ul{
    list-style: none;
    display: flex;
    width: 100%;
    padding: 0;
  }
  nav li{
    width: 50%;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
  }
  nav li:hover{
    color: #41B883;
  }
  .active{
    color: #41B883;
  }
  .article{
    display: flex;
    border-bottom: 1px solid #F0F0F0;
    padding: 15px 0;
  }
  .articleAvator{
    border: 1px solid #ccc;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .articleAvator img{
    display: inline-block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .articleTitle{
    width: 100%;
  }
  .articleTitle p{
    margin: 0;
    font-size: 12px;
    position: relative;
  }
  .articleTitle p i {
    position: absolute;
    right: 0;
    color: #41B883;
  }
  .articleTitle h2{
    margin: 5px 0 0;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    font-size: 16px;
  }
  .articleTitle h2 a{
    color: #000;
  }
  .articleTitle h2 a:hover{
    color: #41b883;
    text-decoration: underline;
  }
  .userTips{
    text-align: center;
    padding: 10px 0;
  }
</style>
