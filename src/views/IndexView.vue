<template>
  <div class="index" :style="{ backgroundImage: 'url(' + backgroundUrl + ')' }">
    <header>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <template v-if="store.userInfo.uname">
            <el-avatar
              :size="30"
              v-if="store.userInfo.avatar"
              :src="store.userInfo.avatar"
            ></el-avatar>
            <el-avatar :size="30" v-else>{{
              store.userInfo.uname.charAt(0)
            }}</el-avatar>
            <span class="uname" v-if="store.userInfo.uname">{{
              store.userInfo.uname
            }}</span>
          </template>
          <el-link
            v-else
            type="info"
            :underline="false"
            :href="
              'https://www.zhangsifan.com/intranet/#/login?redirect_url=' +
              encodeURIComponent('https://www.zhangsifan.com/#/')
            "
            target="_self"
          >
            登录
          </el-link>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a" v-if="store.isLogin">
              个人中心
            </el-dropdown-item>
            <el-dropdown-item command="openSetting"> 设置 </el-dropdown-item>
            <el-dropdown-item command="Logout" v-if="store.isLogin">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </header>
  </div>
  <FooterView />
  <!-- 设置 -->
  <el-dialog
    v-model="state.Visible"
    title="设置"
    width="375px"
    :before-close="closeSteeingBox"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="state.form" label-width="80px">
      <el-form-item label="搜索引擎">
        <el-select v-model="state.form.engine" placeholder="请选择搜索引擎">
          <el-option
            :label="item.title"
            :value="item.value"
            v-for="item in store.getEngine"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="获取天气">
        <el-switch v-model="state.form.isWeather"></el-switch>
      </el-form-item>
      <el-form-item label="搜索建议">
        <el-switch v-model="state.form.isSuggestions"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="save"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  type ComponentInternalInstance,
} from "vue";
import { ElMessage, ElNotification } from "element-plus";
import FooterView from "@/components/FooterView.vue";
import { useCounterStore } from "@/stores/counter";
const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const { $http } = currentInstance.appContext.config.globalProperties;
let backgroundUrl = ref("");
const state = reactive({
  Visible: false,
  form: {
    isWeather: false,
    isSuggestions: false,
    engine: 0,
  },
});
const store = useCounterStore();
// 获取背景
const getBackground = async () => {
  const { result } = await $http("/getbingbg", "get");
  backgroundUrl.value = result;
};
// GoogleReCAPTCHA
const getGoogleReCAPTCHA = () => {
  // eslint-disable-next-line no-undef
  grecaptcha.ready(() => {
    // eslint-disable-next-line no-undef
    grecaptcha
      .execute("6Le3ADEcAAAAABhtAwE7OxPyXzA_XP_M6TMoFz6c", { action: "submit" })
      .then(async (token: string) => {
        const { result } = await $http("/google/getReCAPTCHA", "post", {
          token,
        });
        ElNotification.warning({
          title: "提示",
          position: "bottom-right",
          offset: 55,
          duration: 0,
          message: `
            本网站受reCAPTCHA保护!<br>
            适用与<a href="https://policies.google.cn/privacy?hl=zh-CN&gl=cn">谷歌隐私政策</a> 和
            <a href="https://policies.google.cn/terms?hl=zh-CN&gl=cn">使用条款</a>.`,
          dangerouslyUseHTMLString: true,
        });
        if (!result) console.error("ReCAPTCHA验证失败!");
      });
  });
};
const handleCommand = (command: string) => {
  if (command === "a") {
    login();
  } else if (command === "openSetting") {
    state.Visible = true;
  } else if (command === "Logout") {
    Logout();
  }
};

// 退出登录
const Logout = () => {
  store.logoutUser();
  ElMessage.success("退出登录成功!");
  localStorage.clear();
  reset();
};
// 关闭设置框
const closeSteeingBox = () => {
  state.Visible = false;
};
// 获取设置信息
const getConfig = () => {
  const config = localStorage.getItem("config");
  if (!config) {
    reset();
  } else {
    state.form = JSON.parse(config);
  }
};
// 重置设置
const reset = () => {
  localStorage.setItem("config", JSON.stringify(store.getDefaultConfig));
  state.form = store.getDefaultConfig;
};
// 保存设置
const save = () => {
  localStorage.setItem("config", JSON.stringify(state.form));
  ElMessage.success("保存成功!");
  closeSteeingBox();
};

const login = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) return;
  try {
    const info = JSON.parse(userInfo);
    if (!info.uname) return localStorage.removeItem("userInfo");
    store.updateStore(info);
  } catch (error) {
    localStorage.removeItem("userInfo");
  }
};
onMounted(() => {
  getBackground();
  getGoogleReCAPTCHA();
  getConfig();
  login();
});
</script>
<style lang="less" scoped>
.index {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  min-width: 375px;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  zoom: 1;
  header {
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .el-dropdown {
      cursor: pointer;
      margin-right: 20px;
      .el-dropdown-link {
        height: 30px;
        color: #fff;
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        .uname {
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: keep-all;
        }
        .el-link {
          color: #fff;
        }
      }
    }
  }
}
</style>
