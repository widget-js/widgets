import {WidgetData} from "@widget-js/core";
import dayjs from "dayjs";

export default class LaborProgressData extends WidgetData {
    startHour: number = 9;
    startMinute: number = 0;
    endHour: number = 18;
    endMinute: number = 0;

    getStartTime() {
        return dayjs().set("hour", this.startHour).set("minute", this.startMinute).set("second", 0).toDate()
    }

    getEndTime() {
        return dayjs().set("hour", this.endHour).set("minute", this.endMinute).set("second", 0).toDate()
    }

    setStartTime(date: Date) {
        const d = dayjs(date);
        this.startHour = d.hour()
        this.startMinute = d.minute()
    }

    setEndTime(date: Date) {
        const d = dayjs(date);
        this.endHour = d.hour()
        this.endMinute = d.minute()
    }

}
