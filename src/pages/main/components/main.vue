<template>
  <div class="lottery-main">
    <el-input
      v-model="url"
      size="large"
      placeholder="请输入动态或视频的地址"
      class="input-with-select"
    >
      <template #prepend>
        <el-button :icon="Link" />
      </template>
    </el-input>
    <app-invalid-url v-if="isInvalidURL"></app-invalid-url>
    <template v-else-if="mode === 'home'">
      <template v-if="!isLoadingMetadata">
        <app-metadata
          :url="url"
          :url-description="urlDescription"
          :url-title="urlTitle"
          :url-images-previews="urlImagePreviews"
          :comments-total-count="commentsTotalCount"
        ></app-metadata>
        <div v-if="isLoadingContents" style="margin-top: 16px">
          <span>已抓取评论 {{ commentsLoadedCount }} / {{ commentsTotalCount }} </span>
          <el-progress
            :stroke-width="5"
            :percentage="Math.round((commentsLoadedCount / commentsTotalCount) * 100)"
          >
          </el-progress>
        </div>
        <div v-else-if="isContentsAllLoaded" class="lottery-row-item">
          <span> 已完成加载评论！ </span>
        </div>
        <div class="lottery-operation-panel">
          <template v-if="isContentsAllLoaded">
            <el-button @click="handleSwitchLottery" size="large" type="primary">
              下一步
            </el-button>
            <el-button @click="handleStartLoadContents" size="large" type="primary" style="margin-left: 8px">
              重新加载
            </el-button>
          </template>
          <template v-else>
            <el-button @click="handleStartLoadContents" size="large" type="primary">
              开始加载
            </el-button>
          </template>
        </div>
      </template>
    </template>
    <template v-else-if="mode === 'lottery'">
      <div class="lottery-row-item">
        <div>
          <div> 等级过滤：</div>
          <el-input-number v-model="lotteryUserLevelFilter" :min="0" :max="6" style="margin-top: 8px"/>
        </div>
        <div style="margin-left: 16px">
          <div> 数量：</div>
          <el-input-number v-model="randomPickUsersAmount" :min="1" style="margin-top: 8px"/>
        </div>
      </div>
      <div class="lottery-row-item">
        <div style="width: 50%">
          用户列表：
          <div v-if="candidates.length" style="height: 314px; overflow: scroll" v-infinite-scroll="handleLoadMoreCandidates">
            <user-item v-for="user in candidates" :user="user"></user-item>
          </div>
        </div>
        <div style="width: 50%">
          已抽取：
          <div v-if="randomPickedUsers.length" style="height: 314px; overflow: scroll">
            <user-item v-for="user in randomPickedUsers" :user="user"></user-item>
          </div>
        </div>
      </div>
      <div class="lottery-operation-panel">
        <el-button @click="handleSwitchHome" size="large" type="primary">
          上一步
        </el-button>
        <el-button @click="handleStartRandomPickUserFromCandidates" size="large" type="primary">
          开始抽取
        </el-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent, watch} from 'vue'
import {
  getSignInQRCodeDataURI,
  getUserProfile,
  getMetadata
} from '../library/apis'
import {StorageContent, StorageUser} from '../library/storage'
import {useService} from "./use-service"
import { Link } from '@element-plus/icons-vue'
import debounce from '../library/debounce'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { ElLoading } from 'element-plus'
import UserItem from './stateless/user-item.vue'
import AppMetadata from './stateless/metadata.vue'
import AppInvalidUrl from './stateless/invalid-url.vue'

export default defineComponent({
  name: "AppMain",
  components: {
    Document,
    IconMenu,
    Location,
    Setting,
    Link,
    UserItem,
    AppMetadata,
    AppInvalidUrl,
  },
  setup() {
    const {service} = useService()
    if (!service) {
      throw new Error('Fatal error missing service dependence.')
    }

    const mode = ref<'home' | 'lottery'>('home')
    const username = ref('')
    const userAvatar = ref('')

    const url = ref('https://t.bilibili.com/682550443353571360?spm_id_from=333.999.0.0')
    const isInvalidURL = ref(false)
    const isLoadingMetadata = ref(true)
    const isLoadingContents = ref(false)
    const isContentsAllLoaded = ref(false)

    const isUserSignedIn = ref(false)
    const isShowSignInDialog = ref(false)
    const loginQRCodeDataURI = ref('')

    const urlTitle = ref('')
    const urlDescription = ref('')
    const urlType = ref('')
    const urlImagePreviews = ref<string[]>([])

    const isLotteryRequiredFollow = ref(false)
    const isLotteryRequiredLike = ref(false)
    const lotteryUserLevelFilter = ref(0)
    const commentsLoadedCount = ref(0)
    const commentsTotalCount = ref(0)
    const comments = ref<StorageContent[]>([])

    const usersTotalCount = ref(0)
    const users = ref<StorageUser[]>([])

    const candidatesTotalCount = ref(0)
    const candidates = ref<StorageUser[]>([])

    const randomPickedUsers = ref<StorageUser[]>([])
    const randomPickUsersAmount = ref(1)

    const handleStartLoadMetadata = debounce(async () => {
      const elLoading = ElLoading.service({})
      try {
        const metadata = await getMetadata({url: url.value})
        if (!metadata) {
          console.error('Failed! Invalid URL format.')
          isInvalidURL.value = true
          return
        }
        urlTitle.value = metadata.title
        urlDescription.value = metadata.description
        urlType.value = metadata.type
        urlImagePreviews.value = metadata.images
        isInvalidURL.value = false
        commentsTotalCount.value = metadata.commentsCount
      } catch (err) {
        isInvalidURL.value = true
        console.error(err)
      } finally {
        elLoading.close()
      }
    })

    watch(() => url.value, async () => {
      const state = await service.getPageState()
      if (state?.url !== url.value) {
        isContentsAllLoaded.value = false
        isLoadingMetadata.value = false
        candidates.value = []
        mode.value = 'home'
      }
      if (state && url.value) {
        await service.setPageState({
          ...state,
          url: url.value,
        })
      }
    })
    watch(() => url.value, handleStartLoadMetadata, { immediate: true })

    service.getUserData().then(async userData => {
      isUserSignedIn.value = Boolean(userData)
      isLoadingMetadata.value = false
      if (!userData) {
        const {dataURI, waitForLogin} = await getSignInQRCodeDataURI()
        loginQRCodeDataURI.value = dataURI
        isShowSignInDialog.value = true
        const userData = await waitForLogin
        await service.setUserData(userData)
        window.location.reload()
        return
      }
      const profile = await getUserProfile({userData})
      username.value = profile.username
      userAvatar.value = profile.avatar
    })

    const getRandomUserFromCandidates = async (amount: number) => {
      const max = await service.getCandidatesCount()
      const candidates = new Map<number, StorageUser>()
      for (let i = 0; i < amount; i++) {
        let nextIndex
        do {
          nextIndex = Math.round(Math.random() * max)
        } while (candidates.has(nextIndex))
        const user = await service.getCandidateByIndex({ index: nextIndex })
        if (user) {
          candidates.set(nextIndex, user)
        }
      }
      return [ ... candidates.values() ]
    }
    const handleStartRandomPickUserFromCandidates = async () => {
      randomPickedUsers.value = await getRandomUserFromCandidates(randomPickUsersAmount.value)
    }
    const handleStartLoadContents = async () => {
      isLoadingContents.value = true
      try {
        await service.collectCommentsAndUsers({
          url: url.value,
          onDataLoaded(args) {
            commentsLoadedCount.value = args.loaded
            commentsTotalCount.value = args.total
            if (!comments.value.length) {
              handleLoadMoreComments()
            }
          }
        })
        isContentsAllLoaded.value = true
        mode.value = 'lottery'
        candidates.value = []
        await handleGenerateCandidates()
      } finally {
        isLoadingContents.value = false
      }
    }
    const handleLoadMoreComments = async () => {
      const newComments = await service.listContents({start: comments.value.length, limit: 50})
      comments.value.push(...newComments)
    }
    const handleLoadMoreUsers = async () => {
      usersTotalCount.value = await service.getUsersCount()
      const newUsers = await service.listUsers({start: users.value.length, limit: 50})
      users.value.push(...newUsers)
    }
    const handleLoadMoreCandidates = async () => {
      candidatesTotalCount.value = await service.getCandidatesCount()
      const newUsers = await service.listCandidates({start: candidates.value.length, limit: 50})
      candidates.value.push(...newUsers)
    }

    const handleSwitchLottery = () => {
      if (!candidates.value.length) {
        handleLoadMoreCandidates()
      }
      mode.value = 'lottery'
    }
    const handleSwitchHome = () => mode.value = 'home'

    const handleGenerateCandidates = async () => {
      await service.generateCandidatesFromUsers({
        userIterator(user) {
          if (isLotteryRequiredLike.value && !user.isLike) {
            return false
          }
          if (isLotteryRequiredFollow.value && !user.isFollowed) {
            return false
          }
          if (lotteryUserLevelFilter.value > user.level) {
            return false
          }
          return true
        }
      })
      await handleLoadMoreCandidates()
    }

    return {
      mode,

      comments,
      commentsTotalCount,
      commentsLoadedCount,
      candidatesTotalCount,
      candidates,

      isLoadingMetadata,
      isUserSignedIn,
      loginQRCodeDataURI,
      url,
      urlTitle,
      urlDescription,
      isShowSignInDialog,
      Link,
      debounce,
      handleStartLoadContents,
      handleLoadMoreComments,
      handleLoadMoreUsers,
      handleLoadMoreCandidates,
      handleSwitchLottery,
      handleSwitchHome,
      urlImagePreviews,
      isLoadingContents,
      isContentsAllLoaded,

      isInvalidURL,
      isLotteryRequiredFollow,
      isLotteryRequiredLike,
      lotteryUserLevelFilter,
      randomPickedUsers,
      randomPickUsersAmount,
      handleGenerateCandidates,
      handleStartRandomPickUserFromCandidates,
    }
  }
})
</script>

<style lang="less" scoped>
.lottery-main {
  display: flex;
  padding: 24px;
  flex-direction: column;
  height: 100%;
}
.lottery-row-item {
  display: flex;
  margin-top: 16px;
}
.lottery-operation-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: right;
  align-items: center;
}
</style>
