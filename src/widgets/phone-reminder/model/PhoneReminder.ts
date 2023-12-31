import {
  AppNotification,
  WidgetApi,
  WidgetData,
} from '@widget-js/core'
import dayjs from 'dayjs'

export class PhoneReminder {
  id!: number
  name!: string
  title!: string
  voice!: string
  avatar!: string
  timeSet!: string[]
  workdays = [1, 2, 3, 4, 5]
  lyric?: string
  /**
   * 提前多少秒触发
   */
  advanceSeconds = 0
  enable = true

  constructor(name: string, title: string, avatar: string, voice: string, timeSet: string[], enable = false) {
    this.id = new Date().getTime()
    this.name = name
    this.avatar = avatar
    this.title = title
    this.voice = voice
    this.timeSet = timeSet
    this.enable = enable
  }

  getTimes(): Date[] {
    return this.timeSet.map(it => dayjs(it, 'HH:mm').toDate())
  }

  async toNotification(): Promise<AppNotification> {
    const url = await WidgetApi.getWidgetPackageUrl('cn.widgetjs.widgets')
    return new AppNotification({
      audio: url + this.voice,
      avatar: url + this.avatar,
      message: this.name,
      type: 'call',
      lyric: this.lyric,
      duration: -1,
      title: this.title,
    })
  }
}

const zhangYuGeLyric
  = '[00:00.00]5\n'
  + '[00:00.90]4\n'
  + '[00:01.80]3\n'
  + '[00:02.80]2\n'
  + '[00:03.50]1\n'
  + '[00:04.50]我下班了，蟹老板\n'
  + '[00:06.20]我要说的是\n'
  + '[00:07.30]如果有一天\n'
  + '[00:08.30]我真的实现了\n'
  + '[00:09.70]我生命中的梦想\n'
  + '[00:11.20]我永远也不会让\n'
  + '[00:13.50]我的双脚\n'
  + '[00:14.50]站在这油污的地板上'
const zhangYuGe = new PhoneReminder('章鱼哥', '下班提醒', '/images/zhangyuge.jpg', '/audio/voice/squidward.m4a', [
  '18:00',
])
zhangYuGe.advanceSeconds = 7
zhangYuGe.lyric = zhangYuGeLyric

const teaLyric
  = '[00:00.10]喂！三点几咧！\n'
  + '[00:02.36]做做撚啊做！\n'
  + '[00:04.40]饮茶先啊！\n'
  + '[00:05.50]3点几，饮饮茶先啊！\n'
  + '[00:07.96]做咁多都冇用嘅！\n'
  + '[00:09.20]老细唔惜你嘅咧！\n'
  + '[00:10.96]喂！饮下茶先啊！\n'
  + '[00:12.73]3点几咧！\n'
  + '[00:14.33]做椂㞗啊做！'
const tea = new PhoneReminder('饮茶哥', '饮茶提醒', '/images/avatar/elvis.png', '/audio/voice/elvis.mp3', ['15:00'])
tea.lyric = teaLyric

const pillLyric = '[00:00.40]大郎\n' + '[00:02.50]该吃药了\n' + '[00:05.06]今日新又抓的\n' + '[00:06.93]专治大郎的病'
const pill = new PhoneReminder('潘金莲', '吃药提醒', '/images/avatar/mrs_pan.jpg', '/audio/voice/mrs_pan.m4a', [
  '12:00',
])
pill.lyric = pillLyric

const studyLyric
  = '[00:00.06]游戏里的你\n'
  + '[00:01.50]再强大也是假的\n'
  + '[00:03.60]不是真的\n'
  + '[00:05.00]所以不要贪玩迷恋\n'
  + '[00:08.00]努力学习\n'
  + '[00:09.00]坚持不懈\n'
  + '[00:10.10]梦想一定会成真'
const study = new PhoneReminder('成龙', '学习提醒', '/images/avatar/jackie_chan.jpg', '/audio/voice/jackie_chan.wav', [
  '12:00',
])
study.lyric = studyLyric

export class PhoneReminderData extends WidgetData {
  reminders: PhoneReminder[] = [zhangYuGe, tea, pill, study]

  constructor(name: string) {
    super(name, undefined)
  }

  parseJSON(json: object) {
    super.parseJSON(json)
    const jsonElement = json.reminders
    this.reminders = []
    for (const json of jsonElement) {
      const phoneReminder = new PhoneReminder('', '', '', '', [])
      Object.assign(phoneReminder, json)
      this.reminders.push(phoneReminder)
    }
  }
}
