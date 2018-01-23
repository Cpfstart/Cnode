<template>
<div>
  <el-row class="ding">
    <el-col :span="3"><div class="grid-content bg-purple"><div></div></div></el-col>
    <el-col :span="18"><div class="grid-content bg-purple-light">
      <el-row>
        <el-col :span="4"><div class="about">关于</div></el-col>
      </el-row><hr>
      <el-col :span="20" class="wordParent">
        <div class="kong"><div class="word">CNode 社区为国内最大最具影响力的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</div></div>
        <div class="kong"><div class="word">CNode 社区由一批热爱 Node.js 技术的工程师发起，目前已经吸引了互联网各个公司的专业技术人员加入，我们非常欢迎更多对 Node.js 感兴趣的朋友。</div></div>
        <div class="kong"><div class="word">CNode 的 SLA 保证是，一个9，即 90.000000%。</div></div>
        <div class="kong"><div class="word">社区目前由 alsotang 在维护，有问题请联系：<a href="https://github.com/alsotang">https://github.com/alsotang</a></div></div>
        <div class="kong"><div class="word">请关注我们的官方微博：<a href="http://weibo.com/cnodejs">http://weibo.com/cnodejs</a></div></div>
      </el-col>
    </div></el-col>
  </el-row>
  <el-row class="ding">
    <el-col :span="3"><div class="grid-content bg-purple"><div></div></div></el-col>
    <el-col :span="18"><div class="grid-content bg-purple-light">
      <el-row>
        <el-col :span="4"><div class="about">移动客户端</div></el-col>
      </el-row><hr>
      <el-col :span="20" class="wordParent">
        <div class="kong"><div class="word">客户端由 soliury 开发维护。</div></div>
        <div class="kong"><div class="word">源码地址：<a href="https://github.com/soliury/noder-react-native 。">https://github.com/soliury/noder-react-native 。</a></div></div>
        <div class="kong"><div class="word">另，安卓用户同时可选择：<a href="https://github.com/TakWolf/CNode-Material-Design">https://github.com/TakWolf/CNode-Material-Design</a>，这是 Java 原生开发的安卓客户端。</div></div>
      </el-col>
    </div></el-col>
  </el-row>
</div>
</template>


<style>
.ding{
  padding-top:20px;
}
.about{
  font:22px/56px '微软雅黑';
}
.wordParent{
  padding:40px;
}
.grid-content {
  border-radius: 4px;
  min-height:36px;
}
a{
  text-decoration: none;
  color:#409fff;
}
.kong{
  padding-top:10px;
  padding-bottom:10px;
}
.white{
  height:20px;
}
.word{
  text-align:left;
  font:14px/20px '微软雅黑';
  coloe:#eee;
}
</style>
