import type { Lunar, Solar } from 'lunar-typescript'

export class LunarUtils {
  private static CHINESE_NUMBER = '〇一二三四五六七八九十'
  static getLunarMonthText(month: number): string {
    const arr: string[] = []
    if (month < 0) {
      arr.push('闰')
    }
    if (month == 10) {
      arr.push('十')
    }
    else {
      if (month > 10) {
        arr.push('十')
      }
      arr.push(this.CHINESE_NUMBER[Math.abs(month) % 10])
    }

    arr.push('月')
    return arr.join('')
  }

  /**
   * 1-10  初一 初二 初三 初四 初五 初六 初七 初八 初九 初十
   * 11-20 十一 十二 十三 十四 十五 十六 十七 十八 十九 二十
   * 21-30 廿一 廿二 廿三 廿四 廿五 廿六 廿七 廿八 廿九 三十
   * @param day
   */
  static getLunarDayText(day: number) {
    const arr: string[] = []
    if (day < 10) {
      arr.push('初', this.CHINESE_NUMBER[day % 10])
    }
    else if (day == 10) {
      arr.push('初十')
    }
    else if (day === 20) {
      arr.push('二十')
    }
    else if (day > 20 && day < 30) {
      arr.push('廿', this.CHINESE_NUMBER[day % 10])
    }
    else if (day === 30) {
      arr.push('三十')
    }
    else {
      arr.push('十', this.CHINESE_NUMBER[day % 10])
    }
    return arr.join('')
  }

  static lunarToDate(lunar: Lunar): Date {
    return this.solarToDate(lunar.getSolar())
  }

  static solarToDate(solar: Solar): Date {
    return new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay())
  }
}
