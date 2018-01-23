<template>
  <div class="center">
      <div v-if="!this.$store.state.loading"><Loding></Loding></div>
      <div v-if="this.$store.state.loading">
      <div class="info-top">
        <div class="top-title">
          <span v-show="this.$store.state.list.top">置顶</span>
          <span v-show="this.$store.state.list.good">精华</span>
          <span v-show="this.$store.state.list.tab === 'share'">分享</span>
          <span v-show="this.$store.state.list.tab === 'ask'">回答</span>
          <span v-show="this.$store.state.list.tab === 'job'">招聘</span>
          {{this.$store.state.list.title}}
        </div>
        <div class="change">
          <span>发布于：{{formatDate(this.$store.state.list.create_at)}}</span>
          <span>作者：{{this.$store.state.list.author.loginname}}</span>
          <span>{{this.$store.state.list.visit_count}}次浏览</span>
          <span>来自 {{this.$store.state.list.tab ==='share' ? '分享': this.$store.state.list.tab=== 'ask'? '回答' : '招聘'}}</span>
        </div>
      </div>
      <div v-html="this.$store.state.list.content"></div>
      <div class="panel">
        <div class="header"><span>{{this.$store.state.list.reply_count}}回复</span></div>
        <div class="reply-input" @click="inpInfo">
          <textarea v-model="commonText"></textarea>
          <button type="button" @click="submitContent">发表</button>
        </div>
        <ul> 
          <li v-for="(item,index) in this.$store.state.list.replies"  class="cell cleanFix">
            <div class="content-author">
              <div class="demo-avatar">
                  <Avatar :src="item.author.avatar_url" />
              </div>
              <div class="info">
                  <span>{{item.author.loginname}}</span>
                  <span>{{item.index}}</span>
                  <span>{{formatDate(item.create_at)}}</span>
              </div>
              <div class="rightInfo" @click="submitInfo(index)">
                <span>回复</span>
              </div>
              <div class="action">
                <span @click="ups(item.id)">
                  <i v-if="!iconShow"><Icon type="ios-heart-outline"></Icon></i>
                  <i v-else><Icon type="ios-heart"></Icon></i>{{item.ups.length}}</span>
              </div>
            </div>
            <div class="content-reoly" v-html="item.content">
            </div>
            <div class="reply-input" v-show="currentNum===index">
              <textarea v-model="replyText"></textarea>
              <button type="button" @click="submitOneInfo(item.id,item.author.loginname)">回复</button>
            </div>
          </li>
        </ul>
      </div>

      </div>
  </div>
</template>

<script>
import Loding from '../loding';
import axios from 'axios'
export default {
  data(){
    return {
      iconShow:false,
      commonText:'',
      currentNum:'',
      replyText:'',
      id:this.$route.params.id
    }
  },
  components:{
    Loding,
  },
    methods:{
      formatDate(date){
          if(date){
            return  date.split('T').join(' ').split('.')[0]
          }
        },
        //发表评论
        submitContent(){
          axios.post(`/api/v1/topic/${this.id}/replies`,{
            accesstoken: this.$store.state.userInfo.token,
            content: this.commonText,
          }).then((response)=>{
            if (response.data.success === true){
              alert('评论成功')
              this.commonText = '';
              window.parent.frames.location.reload()
            }
          })
        },
        submitInfo(index){
          this.currentNum=index;
        },
        inpInfo(){
          this.currentNum='';
        },
        //回复其他评论
        submitOneInfo(id,name){
          axios.post(`/api/v1/topic/${this.id}/replies`,{
            accesstoken: this.$store.state.userInfo.token,
            content:'@'+name+':'+ this.replyText,
            reply_id:id
          }).then((response)=>{
            if (response.data.success === true){
              alert('回复成功')
              this.replyText = '';
              window.parent.frames.location.reload()
            }
          })
        },
        //点赞
        ups(upId){
          console.log(upId)
          axios.post(`/api/v1/reply/${upId}/ups`,{
            accesstoken: this.$store.state.userInfo.token,
          }).then((response)=>{
            console.log(response)
            if(response.data.success){
              alert('点赞成功')
              window.parent.frames.location.reload()
            }
          })
        }
    },
    
    beforeCreate(){
      this.$store.dispatch('listAction',{id:this.$router.currentRoute.params.id})
      // console.log(JSON.stringify(this.$route.params.id))
      
  }
}
</script>

<style>
p{
  margin: 6px 0
}
  .center{
    width: 800px;
    margin: 0 auto
  }
  .info-top{
    padding: 10px;
    border-radius: 3px 3px 0 0;
  }
  .top-title{
    font-size: 22px;
    font-weight: 700;
    margin: 8px 0;
    display: inline-block;
    vertical-align: bottom;
    width: 75%;
    line-height: 130%;
  }
  .top-title span{
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
  }
  .change{
    font-size: 12px;
    color: #838383;
  }
  .panel{
    margin: 10px 5px
  }
  .header{
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
  }
  .cell{
    background: #fff;
    border-top: 1px solid #f0f0f0;
    padding: 8px 0 8px 10px
  }
  .content-author{
    display: block
  }
  .demo-avatar{
    float: left;
  }
  .content-reply{
    clear: both;
    padding-left: 0;
    padding-top: 5px;
  }
  .info{
    margin-left: 10px;
    display: inline-block;
  }
  .action{
    float: right;
    margin-left: 20px;
    font-size: 15px;
  }
  .action i{
    margin-right: 2px
  }
  .rightInfo{
    float: right;
    margin: 0 6px;
    font-size:14px;
     cursor: pointer;
  }
  .cleanFix:after{
    display:block;
    clear:both;
    content:""
  }
  .reply-input{
    width: 100%;
    /* height: 50px; */
    background-color: white;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-top: 5px;
    display: block;
    /* display: flex; */
    -webkit-box-pack: center;
    /* justify-content: center; */
    -webkit-box-align: center;
    height: 200px;
    /* align-items: center; */
  }
  .reply-input textarea{
    width: 100%;
    height: 160px;
    font-size: 1.3rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-right: 10px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .reply-input button {
    font-size: 16px;
    padding: 3px 5px;
    background-color: #2196f3;
    color: white;
    border-radius: 3px;
    border: none;
    float: right;
    margin-right: 15px
  }
  .reply-input button:focus{
    outline: none;
  }
  img{
  	max-width: 100%;
  }
</style>
