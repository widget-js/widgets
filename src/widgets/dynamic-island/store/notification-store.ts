import {defineStore} from "pinia";
import {BrowserWindowApi, Notification, NotificationType} from "@widget-js/core";
import dayjs from "dayjs";

export const ID_NOTIFICATION = "babieshahgooG0Ohwea8eighaihiejae";

export enum NotificationSize {
    SMALL = 'small',
    DEFAULT = 'default',
    LARGE = 'large',
}

let hideWindowTimeout = 0;
let hideNotificationTimeout = 0;
export const NOTIFICATION_SIZE_SMALL = 48;
export const useNotificationStore = defineStore(ID_NOTIFICATION, {
    state: () => ({
        show: false,
        windowShowing: false,
        notification: new Notification({message: ""}),
    }),
    getters: {
        height(): number {
            if (!this.show) return NOTIFICATION_SIZE_SMALL
            if (this.size == NotificationSize.SMALL) {
                return NOTIFICATION_SIZE_SMALL
            } else if (this.size == NotificationSize.DEFAULT) {
                return 72
            } else {
                return 144
            }
        },
        type(): NotificationType {
            return this.notification.type;
        },
        size() {
            if (this.notification.type == 'call') {
                return NotificationSize.DEFAULT
            } else if (this.notification.type == 'advance-countdown') {
                return NotificationSize.DEFAULT
            } else if (this.notification.type == 'countdown') {
                return NotificationSize.SMALL
            } else {
                return NotificationSize.SMALL
            }
        },
        backgroundColor() {
            if (this.notification.type == 'countdown') {
                return "#0000007d"
            }
            return "black"
        },
        width(): number {
            if (this.show) {
                return 350
            } else {
                return 50
            }
        },
        isSmall(): boolean {
            return this.size === NotificationSize.SMALL;
        },
        duration(): number {
            if (this.notification.type == 'countdown') {
                const targetTime = dayjs(this.notification.targetTime);
                const seconds = dayjs.duration(targetTime.diff(dayjs())).asSeconds() + 3;
                return seconds * 1000;
            } else if (this.notification.type == 'call') {
                return 120000
            } else {
                return this.notification.duration;
            }
        }
    },
    actions: {
        hideNotification() {
            console.info("Hide Notification");
            this.show = false;
            hideWindowTimeout = window.setTimeout(this.hideWindow, 500);
        },
        async showNotification(notification: Notification) {
            console.info("Show Notification", JSON.stringify(notification));
            this.clearHideTimeout();
            await this.showWindow();
            this.notification = notification;
            this.setHideTimeout();
            this.show = true;
        },
        async showWindow() {
            await BrowserWindowApi.setWindowVisibility(true);
            this.windowShowing = true;
        },
        async hideWindow() {
            console.log("hideWindow");
            await BrowserWindowApi.setWindowVisibility(false);
            this.windowShowing = false;
        },
        clearHideTimeout() {
            clearTimeout(hideWindowTimeout);
            clearTimeout(hideNotificationTimeout);
        },
        setHideTimeout() {
            console.info("Hide Notification In:", this.duration)
            hideNotificationTimeout = window.setTimeout(this.hideNotification, this.duration);
        }
    },
});
