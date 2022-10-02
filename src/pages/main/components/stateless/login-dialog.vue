<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'AppLoginDialog',
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    loginQRCodeDataURI: {
      type: String,
      required: true
    }
  },
  setup(props, ctx) {
  },
})
</script>

<template>
  <el-dialog v-model="isShow" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" title="请使用 Bilibili App 扫码登录" width="700px">
    <el-row justify="center">
      <img :src="loginQRCodeDataURI">
    </el-row>
    <ul style="color: var(--el-text-color-disabled); font-size: 0.5rem">
      <li > 为什么需要登录？<br />
        由于 Bilibili 接口的限制，未登录用户可能不能调用某些接口或者获取某些状态信息
      </li>
      <li style="margin-top: 8px"> 如何保护个人隐私？<br />
        由于当扫码登录后，应用将获得操作账户的完全权限，因此出于安全考虑，你应当<br />
        - 不需要以关注作为抽取条件时，新注册一个专用的空白账户，专门用于抽奖用途。<br />
        - 确保并验证本软件下载自原始发布渠道。 <br />
        - 使用完毕后，在 Bilibili 账户管理页面撤销本次登录授权。 <br />
      </li>
      <li style="margin-top: 8px">
        本软件为完全免费的开源软件，基于 <a href="https://www.gnu.org/licenses/agpl-3.0.zh-cn.html" target="_blank"> GNU Affero通用公共许可证 </a> 发布。
      </li>
    </ul>
  </el-dialog>
</template>
