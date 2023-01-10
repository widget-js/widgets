import {WidgetData} from "@widget-js/core";
import dayjs from "dayjs";
import {DateType} from "@/countdown/Event";

export class CountdownModel extends WidgetData {
    title: string = "新年";
    date: string = dayjs().set('year', dayjs().get('year') + 1).set('month', 0).set('date', 1).toISOString();
    dateType = DateType.SOLAR;
    backgroundColor: string = "#FFC455";
}
