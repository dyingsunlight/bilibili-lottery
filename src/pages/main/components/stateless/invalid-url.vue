<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'AppInvalidURL',
  props: {
  },
  setup() {
  },
})
</script>

<template>
<div style="display: flex; height: 300px; justify-content: center; align-items: center">
  <p>
    输入的动态地址无效或者是已经被删除！
  </p>
</div>
</template>
