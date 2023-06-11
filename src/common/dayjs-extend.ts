import dayjs from "dayjs"
import isoWeek from "dayjs/plugin/isoWeek"
import objectSupport from 'dayjs/plugin/objectSupport'
import isBetween from 'dayjs/plugin/isBetween'
import weekday from "dayjs/plugin/weekday"
import duration from "dayjs/plugin/duration"

dayjs.extend(duration);
dayjs.extend(weekday)
dayjs.extend(objectSupport);
dayjs.extend(isBetween);
dayjs.extend(isoWeek)
