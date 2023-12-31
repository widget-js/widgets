import { it } from 'vitest'
import {
  RRule,
  RRuleSet,
} from 'rrule'
import dayjs from 'dayjs'

it('rRule', () => {
  const daysAfter10 = dayjs().add(10, 'day').toDate()
  const daysBefore3 = dayjs().subtract(3, 'day').toDate()
  const dailyRule = new RRule({ freq: RRule.DAILY })
  const weeklyRule = new RRule({ freq: RRule.WEEKLY })
  console.log(dailyRule.toString())
  console.log(weeklyRule.toString())
  const dailyRruleSet = new RRuleSet()
  dailyRruleSet.rrule(dailyRule)

  const weeklyRuleSet = new RRuleSet()
  weeklyRuleSet.rrule(weeklyRule)

  dailyRruleSet.rdate(daysAfter10)
  weeklyRuleSet.rdate(daysBefore3)

  console.log(dailyRule.all())
  console.log(weeklyRuleSet.rdates())
})
