import {WidgetData} from "@widget-js/core";

export interface BirthdayPeople {
    name: string;
    month: number;
    day: number;
    type: string;
    qty: number;
    /**
     * 创建的时间戳，用于排序使用
     */
    createdAt: number;
}

export default class BirthdayListData extends WidgetData {
    peopleList: BirthdayPeople[] = [];
    backgroundColor = "#FB604B";
    title: String = "生日列表";
}
