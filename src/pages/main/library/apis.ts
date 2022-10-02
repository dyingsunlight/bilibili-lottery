import {fetch, ResponseType} from "@tauri-apps/api/http";
// @ts-ignore
import QRious from 'qrious'
import {UserData} from "./storage"
import {Comment, DynamicMetadata, UserProfile, VideoMetadata} from './types'

export const getSignInQRCodeDataURI = async () => {
  const queryQRCode = await fetch<any>('https://passport.bilibili.com/x/passport-login/web/qrcode/generate')
  const qr = new QRious({
    value: queryQRCode.data.data.url,
    size: 200,
  })
  return {
    dataURI: qr.toDataURL(),
    waitForLogin: new Promise<UserData>(async resolve => {
      while (true) {
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('Polling ...')
        const res = await fetch<any>(`https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${encodeURIComponent(queryQRCode.data.data.qrcode_key)}`)
        if (res.data?.data?.code === 0) {
          resolve({
            refreshToken: res.data.data.refresh_token,
            // @ts-ignore
            cookie: res.rawHeaders['set-cookie'].reduce((prev, item) => (prev += (item.split(';')[0] + '; ')), '')
          } as UserData)
          break
        }
      }
    })
  }
}

const getUserBasicProfile = async (args: { userData: UserData }) => {
  const { userData } = args
  const profile = await fetch<any>('https://api.bilibili.com/nav', { method: 'GET', headers: { cookie: userData.cookie }})
  return profile.data.data as UserProfile
}

export const getUserProfile = async (args: { userData: UserData }) => {
  const { userData } = args
  const res = await fetch<any>('https://api.bilibili.com/nav', { method: 'GET', headers: { cookie: userData.cookie }})
  const profile = res.data.data as UserProfile
  return {
    username: profile.uname,
    avatar: profile.face,
    level: profile.level_info.current_level,
  }
}

const oidDynamicRecords: Record<string, { type: number, oid: string}> = {}
const DynamicRegex = /t\.bilibili\.com\/(?<id>\d+)/
const BVideoRegex = /bilibili.com\/video\/(?<id>BV[^\/?]+)/
const getDynamicMetadata = async (args: { url: string }) => {
  const { url } = args
  const id = DynamicRegex.exec(url)!.groups!.id
  const res = await fetch<any>(`https://api.bilibili.com/x/polymer/web-dynamic/v1/detail?id=${id}`)
  return res.data.data as DynamicMetadata
}

const getVideoMetadata = async (args: { url: string }) => {
  const { url } = args
  const bvid = BVideoRegex.exec(url)!.groups!.id
  const res = await fetch<any>(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`)
  return res.data.data as VideoMetadata
}
export const getMetadata = async (args: { url: string }) => {
  const { url } = args
  let title = ''
  let description = ''
  let type = 'none'
  const images: string[] = []
  if (DynamicRegex.test(url)) {
    const dynamicMetadata = await getDynamicMetadata({ url })
    if (!dynamicMetadata) {
      return
    }
    type = 'dynamic'
    title = ''
    description = dynamicMetadata?.item?.modules?.module_dynamic?.desc.text ?? ''
    if (dynamicMetadata?.item?.modules?.module_dynamic?.major?.type) {
      images.push(...dynamicMetadata.item.modules.module_dynamic.major.draw.items.map(img => img.src))
    }
  } else if (BVideoRegex.test(url)) {
    const videoMetadata = await getVideoMetadata({ url })
    if (!videoMetadata) {
      return
    }
    type = 'video'
    title = videoMetadata.title
    description = videoMetadata.desc
  } else {
    return
  }
  const comments = await getComments({ url, limit: 1, page: 0 })
  return {
    type,
    title,
    description,
    commentsCount: comments.page.count,
    images,
  }
}

const getDynamicOidAndType = async (args: { url: string }) => {
  const { url } = args
  const id = DynamicRegex.exec(url)!.groups!.id
  let oid = ''
  let type = 0
  const record = oidDynamicRecords[id]
  if (record) {
    oid = record.oid
    type = record.type
  } else {
    const metadata = await getDynamicMetadata({ url })
    oid = metadata["item"]["basic"]["comment_id_str"]
    type = metadata["item"]["basic"]["comment_type"]
    oidDynamicRecords[oid] = { oid, type }
  }
  return { oid, type }
}
const getVideoOidAndType = async (args: { url: string; }) => {
  const { url } = args
  const bvid = BVideoRegex.exec(url)!.groups!.id
  const record = oidDynamicRecords[bvid]
  let oid = ''
  if (record) {
    oid = record.oid
  } else {
    const metadata = await getVideoMetadata({ url })
    oid = String(metadata.aid)
    oidDynamicRecords[oid] = { oid, type: 1 }
  }
  return {
    oid,
    type: 1
  }
}
const findOIDAndType = async (args: { url: string; }) => {
  const { url } = args
  if (DynamicRegex.test(url)) {
    return getDynamicOidAndType({ url })
  }
  if (BVideoRegex.test(url)) {
    return getVideoOidAndType({ url })
  }
}
export const getComments = async (args: { url: string; page?: number; limit?: number; userData?: UserData }) => {
  const { url, page, limit, userData } = args
  const { oid, type } = await findOIDAndType({ url }) || {}
  if (oid) {
    const res = await fetch<any>(`https://api.bilibili.com/x/v2/reply?type=${type}&oid=${oid}&ps=${limit}&pn=${page}`, {
      method: 'GET',
      headers: {
        cookie: userData?.cookie,
      }
    })
    return res.data.data as Comment
  } else {
    throw new Error('Unknown url type')
  }
}

