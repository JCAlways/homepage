<template>
  <div class="footer_view">
    <el-link
      :underline="false"
      type="info"
      v-for="(item, index) in list"
      :key="index"
      :href="item.url"
      target="_blank"
    >
      {{ item.title }}
    </el-link>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const list = reactive([
  {
    title: "博客",
    url: "https://blog.zhangsifan.com",
  },
  {
    title: "API",
    url: "https://api.zhangsifan.com",
  },
  {
    title: "隐私",
    url: "https://privacy.zhangsifan.com",
  },
  {
    title: "©2022 JCAlways",
  },
  {
    title: "站长统计",
    url: "https://uweb.umeng.com/v1/login.php?siteid=1279679621",
  },
  {
    title: "京ICP备19044601号",
    url: "https://beian.miit.gov.cn/",
  },
  {
    title: "京公网安备 11011302001809号",
    url: "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011302001809",
  },
]);
</script>
<style lang="less" scoped>
.footer_view {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 40px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  .el-link {
    text-align: center;
    margin: 0 6px;
    font-size: 12px;
  }
}
</style>
