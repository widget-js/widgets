<template>
  <dynamic-island-widget ref="dynamicIslandWidget"
                         v-model:state="state"
                         @mouseenter="onMouseEnter"
                         @mouseleave="onMouseLeave"
                         @hidden="hidden"
                         :notification="notification"/>
</template>

<script lang="ts">
import {AppNotification, BrowserWindowApi, ElectronUtils, WidgetApi, WidgetData} from "@widget-js/core";
import DynamicIslandWidget from "./DynamicIslandWidget.vue"
import {useNotification, useWidget} from "@widget-js/vue3";
import {computed, ref} from "vue";
import {useIntervalFn, useTimeoutFn} from "@vueuse/core";
import {NotificationState} from "@/widgets/dynamic-island/model/NotificationState";

export default {
  name: "DynamicIslandWidgetView",
  components: {DynamicIslandWidget},
  setup() {
    const {widgetParams} = useWidget(WidgetData);
    const dynamicIslandWidget = ref();
    const defaultNotification = new AppNotification({
      duration: 0,
      message: "欢迎",
      title: "",
      type: "info"
    });

    const notification = ref(defaultNotification);
    const hide = () => {
      state.value = NotificationState.HIDE
    }
    useNotification((newNotification) => {
      if (newNotification) {
        BrowserWindowApi.show();
        notification.value = new AppNotification({...newNotification! });
        // Object.assign(notification, newNotification);
        setState();
        stopHideTimeout();
        startHideTimeout();
      } else {
        hide();
      }
    })

    const hideTimeout = computed(() => {
      return notification.value.duration
    })

    const state = ref(NotificationState.HIDE);
    const inElectron = ElectronUtils.hasElectronApi();

    let previousStateIndex = 0;
    const setState = () => {
      switch (notification.value.type) {
        case "advance-countdown":
        case "call":
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

    const showInfoDemo = () => {
      notification.value.type = "info"
      notification.value.message = "您好"
      setState();
    }

    const showUrlDemo = async () => {
      const packageUrl = await WidgetApi.getWidgetPackageUrl("cn.widgetjs.widgets",false);
      notification.value.avatar = packageUrl + "/images/zhangyuge.jpg"
      notification.value.title = "章鱼哥"
      notification.value.message = "下班提醒"
      notification.value.type = "call"
      setState();
    };
    //预览动画

    const showReminderDemo = () => {
      notification.value.type = "reminder"
      notification.value.message = "您已经连续使用电脑45分钟"
      notification.value.title = "久坐提醒"
      notification.value.icon = "computer_line"
      notification.value.cancelButtonText = "知道了"
      notification.value.confirmButtonText = "休息一下"
      setState();
    };

    const {start, stop: stopHideTimeout} = useTimeoutFn(() => {
      hide();
    }, hideTimeout)

    const startHideTimeout = () => {
      if (hideTimeout.value > 0) {
        start();
      }
    }

    const {pause, resume} = useIntervalFn(() => {
      state.value = NotificationState.NORMAL;
      previousStateIndex++;
      switch (previousStateIndex % 3) {
        case 0:
          showReminderDemo();
          break;
        case 1:
          showUrlDemo();
          break;
        case 2:
          showInfoDemo();
          break;
      }
    }, 2000);

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
      showUrlDemo,
      showInfoDemo,
      showReminderDemo,
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
