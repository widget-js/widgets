import dayjs, {Dayjs} from "dayjs";

export default class EmojiTimeline {
    startPercent: number
    endPercent: number

    emoji: string

    title: string = "-1s"
    titleAnimationDuration = 1

    constructor(emoji: string, startPercent: number, endPercent: number, titleAnimationDuration: number = 1, title: string = "-1s") {
        this.emoji = emoji;
        this.startPercent = startPercent;
        this.endPercent = endPercent;
        this.titleAnimationDuration = titleAnimationDuration
        this.title = title
    }

    isActivated(percent: number): boolean {
        return this.endPercent >= percent && this.startPercent <= percent;
    }
}
