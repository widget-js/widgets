import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import objectSupport from 'dayjs/plugin/objectSupport';
import isBetween from 'dayjs/plugin/isBetween';
import duration from "dayjs/plugin/duration"

dayjs.extend(duration);
dayjs.extend(objectSupport);
dayjs.extend(isBetween);
dayjs.extend(isoWeek)
