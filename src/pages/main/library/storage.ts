import { openDB, deleteDB } from 'idb'

export interface StorageContent {
  username: string
  content: string
  index: number
  userId: string
}
export interface StorageUser {
  username: string
  index: number
  userId: string
  isFollowed: boolean
  level: number
  fansLevel: number
  isLike: boolean
  isDislike: boolean
  avatar?: string
}
const UserDataKey = 'UserData'

export interface UserData {
  refreshToken: string
  cookie: string
}

export class ObjectStorage {
  private createDB = () => {
    return openDB('default', 1, {
      upgrade: function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains('users')) {
          const store = upgradeDb.createObjectStore('users', { keyPath: 'index', autoIncrement: true })
          store.createIndex('userId', 'userId', { unique: true })
        }
        if (!upgradeDb.objectStoreNames.contains('candidates')) {
          const store = upgradeDb.createObjectStore('candidates', { keyPath: 'index', autoIncrement: false })
          store.createIndex('userId', 'userId', { unique: true })
          store.createIndex('index', 'index', { unique: true })
        }
        if (!upgradeDb.objectStoreNames.contains('state')) {
          upgradeDb.createObjectStore('state', { keyPath: 'key' })
        }
        if (!upgradeDb.objectStoreNames.contains('contents')) {
          const store = upgradeDb.createObjectStore('contents', { keyPath: 'index', autoIncrement: true })
          store.createIndex('userId', 'userId', { unique: false })
          store.createIndex('index', 'index', { unique: true })
        }
      }
    })
  }
  private initPromise = this.createDB()
  async clear() {
    const db = await this.initPromise
    db.close()
    await deleteDB('default')
    this.initPromise = this.createDB()
    await this.initPromise
  }

  async addContent(args: { content: Omit<StorageContent, 'index'> }) {
    const { content } = args
    const db = await this.initPromise
    console.log('Adding', content)
    await db.put('contents', content)
  }
  async listContents(args: { start: number; limit: number}) {
    const { start, limit } = args
    const db = await this.initPromise
    return await db.getAllFromIndex('contents', 'index', IDBKeyRange.bound(
      start,
      start + limit,
      false,
      false
    )) as StorageContent[]
  }
  async listContentsByUserId(args: { userId: string;}) {
    const { userId } = args
    const db = await this.initPromise
    return await db.getAllFromIndex('contents', 'userId', IDBKeyRange.bound(
      userId,
      userId,
      false,
      false
    )) as StorageContent[]
  }
  async getContentsCount() {
    const db = await this.initPromise
    return await db.count('contents')
  }

  async getCandidateByIndex(args: { index: number }) {
    const { index } = args
    const db = await this.initPromise
    const user = await db.getFromIndex('candidates', 'index', IDBKeyRange.bound(
      index,
      index,
      false,
      false
    ))
    return user
  }
  async generateCandidatesFromUsers(args: { userIterator: (user: StorageUser, abort: () => void) => boolean}) {
    const { userIterator } = args
    const db = await this.initPromise
    await db.clear('candidates')
    const pendingAddPromise = new Set
    let cursor = await db.transaction('users').store.openCursor()
    let isForceStopped = false
    let index = 0
    while (cursor) {
      const user = cursor.value
      if (userIterator(user, () => (isForceStopped = true))) {
        try {
          const promise = db.put('candidates', { ...user, index })
          promise.then(() => pendingAddPromise.delete(promise))
          pendingAddPromise.add(promise)
        } catch (err) {
          console.error(err)
        }
      }
      if (isForceStopped) {
        await db.clear('candidates')
        break
      }
      index++
      cursor = await cursor.continue()
    }
    await Promise.all([ ...pendingAddPromise ])
  }
  async getCandidatesCount() {
    const db = await this.initPromise
    return await db.count('candidates')
  }
  async listCandidates(args: { start: number; limit: number}) {
    const { start, limit } = args
    const db = await this.initPromise
    return await db.getAllFromIndex('candidates', 'index', IDBKeyRange.bound(
      start,
      start + limit,
      false,
      false
    )) as StorageUser[]
  }
  async hasUser(args: { user: Omit<StorageUser, 'index'> }) {
    const db = await this.initPromise
    const { user } = args
    await db.put('users', user)
  }
  async addUser(args: { user: Omit<StorageUser, 'index'> }) {
    const db = await this.initPromise
    const { user } = args
    if (await db.getFromIndex('users', 'userId', user.userId)) {
      return
    }
    await db.put('users', user)
  }
  async listUsers(args: { start: number; limit: number}) {
    const { start, limit } = args
    const db = await this.initPromise
    return await db.getAllFromIndex('users', 'index', IDBKeyRange.bound(
      start,
      start + limit,
      false,
      false
    )) as StorageUser[]
  }
  async getUsersCount() {
    const db = await this.initPromise
    return await db.count('users')
  }

  async getPageState() {
    const db = await this.initPromise
    try {
      const state =  (await db.get('state', 'pageState')) as { currentPage: number; url: string; isAllLoaded: boolean } |  undefined
      if (state) {
        // @ts-ignore
        delete state.key
        return state
      }
    } catch (err) {
      console.error(err)
    }
  }
  async setPageState(args: { currentPage: number; url: string; isAllLoaded?: boolean }) {
    const { url } = args
    const db = await this.initPromise
    await db.put('state', {
      key: 'pageState',
      ...args,
      url,
    })
  }

  async getUserData() {
    const userData = window.localStorage.getItem(UserDataKey)
    if (userData) {
      return JSON.parse(userData) as UserData
    }
  }
  async setUserData(userData: UserData) {
    window.localStorage.setItem(UserDataKey, JSON.stringify(userData))
  }
}
