import {WidgetData} from "@widget-js/core";

export class WaveProgressData extends WidgetData{

    // 类型
    progressType: ProgressType = ProgressType.today;

    // 事件名称
    eventName: string = "今天";

    startDate?: Date ;

    endDate?: Date;

    isLunar?: Boolean;
}


export enum ProgressType {
    today = 0,
    toWeek,
    toMonth,
    toYear,
    custom
}
