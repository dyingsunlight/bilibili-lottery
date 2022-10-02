<script lang="ts">
import {defineComponent, PropType, ref, watch} from 'vue'
import {fetch, ResponseType} from "@tauri-apps/api/http"
import {encode} from "base64-arraybuffer"

export default defineComponent({
  name: 'AppMetadata',
  props: {
    url: {
      type: String,
      required: true,
    },
    urlTitle: {
      type: String,
      required: true,
    },
    urlDescription: {
      type: String,
      required: true,
    },
    urlImagesPreviews: {
      type: Array as PropType<string[]>,
      required: true,
    },
    commentsTotalCount: {
      type: Number,
      required: true,
    },
  },
  setup(props, ctx) {
    const urlImagePreviewsDataURI = ref<string[]>([])

    watch(() => props.urlImagesPreviews, async () => {
      urlImagePreviewsDataURI.value = await Promise.all<string>(props.urlImagesPreviews.map(src => {
        return new Promise(async resolve => {
          const res = await fetch<ArrayBuffer>(src, { method: 'GET', responseType: ResponseType.Binary })
          if (res.ok) {
            resolve(`data:image/png;base64,${encode(res.data)}`)
          }
          resolve('')
        })
      })).catch(err => console.error(err)) || []
    }, { immediate: true })
    return {
      urlImagePreviewsDataURI,
    }
  },
})
</script>

<template>
  <div>
    <el-descriptions
      style="margin-top: 16px"
      :column="2"
      border
    >
      <el-descriptions-item min-width="150px">
        <template #label>
          标题
        </template>
        <span v-if="urlTitle"> {{ urlTitle }} </span>
        <span v-else> 无 </span>
      </el-descriptions-item>
      <el-descriptions-item min-width="150px">
        <template #label>
          预计评论数
        </template>
        <span> {{ commentsTotalCount }} </span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          内容
        </template>
        <span> {{ urlDescription }} </span>
      </el-descriptions-item>
    </el-descriptions>
    <el-row justify="center" style="margin-top: 16px">
      <el-image
        v-for="(src, index) in urlImagePreviewsDataURI"
        style="width: 250px;"
        :src="urlImagePreviewsDataURI[index]"
        :preview-src-list="urlImagePreviewsDataURI"
        :initial-index="index"
        fit="contain"
      />
    </el-row>
  </div>
</template>
