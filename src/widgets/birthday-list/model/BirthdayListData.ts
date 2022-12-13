import {WidgetData} from "@widget-js/core";

declare class BirthdayPeople {
    name: string;
    month: number;
    day: number;
    type: string;
    qty: number;
}

export default class BirthdayListData extends WidgetData {
    peopleList: BirthdayPeople[] = [];
    backgroundColor = "#FB604B";
    title: String = "生日列表";
}