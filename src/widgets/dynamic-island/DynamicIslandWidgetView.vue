<template>
  <dynamic-island-widget ref="dynamicIslandWidget"
                         v-model:state="state"
                         @mouseenter="onMouseEnter"
                         @mouseleave="onMouseLeave"
                         :notification="notification"/>
</template>

<script lang="ts">
import {
  AppNotification,
  BrowserWindowApi,
  ElectronUtils,
  NotificationApi,
  WidgetApi,
  WidgetData
} from "@widget-js/core";
import DynamicIslandWidget from "./DynamicIslandWidget.vue"
import {useNotification, useWidget} from "@widget-js/vue3";
import {computed, reactive, ref, watch} from "vue";
import {useIntervalFn, useTimeoutFn} from "@vueuse/core";
import {NotificationState} from "@/widgets/dynamic-island/model/NotificationState";
import {CountdownDemo, SitReminderDemo} from "@/widgets/dynamic-island/model/Demo";
import "@/common/dayjs-extend";
import useSitReminder from "./composition/use-sit-reminder";

export default {
  name: "DynamicIslandWidgetView",
  components: {DynamicIslandWidget},
  setup() {
    const {widgetParams} = useWidget(WidgetData);
    const dynamicIslandWidget = ref();
    const state = ref(NotificationState.HIDE);
    const defaultNotification = new AppNotification({
      duration: 0,
      message: "欢迎",
      title: "",
      type: "info"
    });

    const notification = reactive(defaultNotification);
    const hide = () => {
      state.value = NotificationState.HIDE
    }

    useNotification((newNotification) => {
      if (newNotification) {
        BrowserWindowApi.show();
        BrowserWindowApi.moveTop();
        // notification.value = new AppNotification({...newNotification! });
        Object.assign(notification, newNotification);
        setState();
        stopHideTimeout();
        startHideTimeout();
      } else {
        hide();
      }
    })

    if (!widgetParams.preview) {
      useSitReminder()
    }

    watch(state, (newValue) => {
      if (newValue == NotificationState.HIDE) {
        startHideWindow();
      } else {
        stopHideWindow();
      }
      console.log(state.value);
    })
    const {start: startHideWindow, stop: stopHideWindow} = useTimeoutFn(() => {
      console.log("hide window");
      BrowserWindowApi.hide();
    }, 1000)

    stopHideWindow();

    const hideTimeout = computed(() => {
      return notification.duration
    })

    const inElectron = ElectronUtils.hasElectronApi();

    let previousStateIndex = 0;
    const setState = () => {
      switch (notification.type) {
        case "call":
        case "advance-countdown":
        case "url":
          state.value = NotificationState.NORMAL;
          break;
        case "reminder":
          state.value = NotificationState.LARGE;
          break;
        default:
          state.value = NotificationState.SMALL;
          break;
      }
    }

    const {start, stop: stopHideTimeout} = useTimeoutFn(() => {
      hide();
    }, hideTimeout)

    const startHideTimeout = () => {
      if (hideTimeout.value > 0) {
        start();
      }
    }

    const {pause, resume} = useIntervalFn(async () => {
      state.value = NotificationState.NORMAL;
      previousStateIndex++;
      switch (previousStateIndex % 4) {
        case 0:
          Object.assign(notification, CountdownDemo)
          break;
        case 1:
          const packageUrl = await WidgetApi.getWidgetPackageUrl("cn.widgetjs.widgets");
          notification.avatar = packageUrl + "/images/zhangyuge.jpg"
          notification.title = "章鱼哥"
          notification.message = "下班提醒"
          notification.type = "call"
          notification.backgroundColor = "black"
          break;
        case 2:
          notification.type = "info"
          notification.backgroundColor = "black"
          notification.message = "您好"
          break;
        case 3:
          Object.assign(notification, SitReminderDemo)
          break;
      }
      setState();
    }, 2000, {immediate: true});

    if (widgetParams.preview) {
      resume();
    } else {
      pause();
    }
    return {
      setState,
      dynamicIslandWidget,
      inElectron,
      state,
      notification,
      widgetParams,
      startHideTimeout,
      stopHideTimeout,
      hide,
    };
  },
  watch: {
    notification: {
      handler(newValue, oldValue) {
        console.log(JSON.stringify(newValue))
      },
      deep: true
    }
  },
  methods: {
    async onMouseEnter() {
      await BrowserWindowApi.setIgnoreMouseEvent(false);
      this.stopHideTimeout();
    },
    async onMouseLeave() {
      await BrowserWindowApi.setIgnoreMouseEvent(true);
      this.startHideTimeout();
    },
    hidden() {
      console.log("hidden");
      BrowserWindowApi.hide();
    }
  }
}
</script>

<style scoped>

</style>
