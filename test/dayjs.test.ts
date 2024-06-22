import { describe, expect, it } from 'vitest'
import dayjs from 'dayjs'
import { Solar } from 'lunar-typescript'

describe('dayjs', () => {
  it('isValid', () => {
    const time = dayjs('08:44', 'HH:mm')
    expect(time.isValid()).toBeFalsy()
    const date = dayjs('1996-08-17 08:44', 'YYYY-MM-DD HH:mm')
    expect(date.isValid()).toBeTruthy()

    console.log(Solar.fromDate(date.toDate()).toFullString())
  })
})
