<script lang="ts">
import {defineComponent, PropType, ref, watch} from 'vue'
import { StorageUser } from "../../library/storage"
import {fetch, ResponseType} from "@tauri-apps/api/http";
import {encode} from "base64-arraybuffer";

export default defineComponent({
  name: 'AppUserItem',
  props: {
    user: {
      type: Object as PropType<StorageUser>,
      required: true
    }
  },
  setup(props, ctx) {
    const avatarDataURI = ref('')
    watch(() => props.user.avatar, async (newVal, oldValue) => {
      if (newVal && newVal !== oldValue) {
        const res = await fetch<ArrayBuffer>(newVal, { method: 'GET', responseType: ResponseType.Binary })
        if (res.ok) {
          avatarDataURI.value = `data:image/png;base64,${encode(res.data)}`
        }
      }
    }, { immediate: true })
    return {
      avatarDataURI,
    }
  },
})
</script>

<template>
  <div style="display:flex; align-items: center; margin-top: 8px">
    <span style="display:inline-block; min-width: 32px; border-right: 1px solid rgba(0, 0, 0, .3); text-align: center"> {{ user.index }} </span>
    <el-avatar style="margin-left: 16px" :size="36" :src="avatarDataURI"></el-avatar>
    <span style="margin-left: 16px; width: 250px; display: inline-block; white-space: nowrap" :title="user.username">
      <span>
        {{ user.username }}
      </span>
      <a :href="`https:/space.bilibili.com/${user.userId}`" target="_blank">
       ({{ user.userId }})
      </a>
    </span>
  </div>
</template>
