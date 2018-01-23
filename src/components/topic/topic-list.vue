<template>
  <div class="list">
                <div class="list-item" v-for="item in this.$store.state.topics">
                    <div class="item-left">
                        <div class="demo-avatar">
                            <Avatar :src="item.author.avatar_url" />
                        </div>
                        <div class="item-left-content">
                            <div class="content-title">
                                <span v-show="item.top">置顶</span>
                                <span v-show="item.good">精华</span>
                                <span v-show="item.tab === 'share'">分享</span>
                                <span v-show="item.tab === 'ask'">回答</span>
                                <span v-show="item.tab === 'job'">招聘</span>
                                <!-- <a herf="https://www.baidu.com">{{item.title}}</a> -->
                                <router-link :to="'/topic/'+item.id">{{item.title}}</router-link>
                            </div>
                            <div class="content-description">
                                <span>{{item.author.loginname}} 发表于: {{formatDate(item.create_at)}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="item-contents">
                      <div></div>
                    </div>
                    <ul class="item-right">
                        <li>回复:{{item.reply_count}}</li>
                        <li>访问:{{item.visit_count}}</li>
                    </ul>
                </div>
                <Page :total="100" show-sizer @on-change="change"></Page>
              </div>
</template>

<script>
export default {
    methods:{
        change(page){
            this.$store.dispatch('getListAction', {
                pageNum: page
            })
        },
        formatDate(date){
            if(date){
                return date.split('T').join(' ').split('.')[0]
            }
           
        }
    }
}
</script>

<style>

</style>
