import { getComments } from "../library/apis";
import {ObjectStorage} from "../library/storage";

export class AppService {
  private objectStorage = new ObjectStorage()
  constructor() {
    // @ts-ignore
    window.objectStorage = this.objectStorage
  }
  async collectCommentsAndUsers (args: { url: string; onDataLoaded: (args: { loaded: number; total: number; url: string }) => void }) {
    const { url, onDataLoaded } = args
    const userData = await this.objectStorage.getUserData()
    let pageNumber = 0
    let lastContentIndex = 0
    await this.objectStorage.clear()
    while (true) {
      const res = await getComments({ url, page: pageNumber, limit: 50, userData })
      if (res) {
        for (const reply of res.replies) {
          const user = reply.member
          lastContentIndex++
          await this.objectStorage.addUser({
            user: {
              userId: user.mid,
              username: user.uname,
              level: user.level_info?.current_level ?? -1,
              isFollowed: Boolean(user.is_followed),
              fansLevel: user.fans_detail?.level ?? -1,
              isLike: reply.action === 1,
              isDislike: reply.action === 2,
              avatar: user.avatar
            }
          })
          await this.objectStorage.addContent({
            content: {
              userId: user.mid,
              username: user.uname,
              content: reply.content.message,
            }
          })
        }
        await this.objectStorage.setPageState({ currentPage: pageNumber, url })
        const loaded = await this.objectStorage.getContentsCount()
        const total = res.page.count
        let isAborted = false
        onDataLoaded({
          loaded,
          total,
          url,
        })
        if (isAborted || loaded >= total || !res.replies.length) {
          break
        }
      } else {
        break
      }
      pageNumber++
    }
    await this.objectStorage.setPageState({ currentPage: pageNumber, url, isAllLoaded: true })
  }
  clearStorage = this.objectStorage.clear.bind(this)
  getPageState = this.objectStorage.getPageState.bind(this.objectStorage)
  setPageState = this.objectStorage.setPageState.bind(this.objectStorage)
  listContents = this.objectStorage.listContents.bind(this.objectStorage)
  listContentsByUserId = this.objectStorage.listContentsByUserId.bind(this.objectStorage)
  listUsers = this.objectStorage.listUsers.bind(this.objectStorage)
  getUsersCount = this.objectStorage.getUsersCount.bind(this.objectStorage)
  getCandidateByIndex = this.objectStorage.getCandidateByIndex.bind(this.objectStorage)
  listCandidates = this.objectStorage.listCandidates.bind(this.objectStorage)
  generateCandidatesFromUsers = this.objectStorage.generateCandidatesFromUsers.bind(this.objectStorage)
  getCandidatesCount = this.objectStorage.getCandidatesCount.bind(this.objectStorage)
  getUserData = this.objectStorage.getUserData.bind(this.objectStorage)
  setUserData = this.objectStorage.setUserData.bind(this.objectStorage)
}
