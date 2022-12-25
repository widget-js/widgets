<template>
  <!-- TODO:组件页面，这里编写组件业务逻辑-->
  <dynamic-island-widget></dynamic-island-widget>
</template>

<script lang="ts">
import {Channel, Notification, WidgetData} from "@widget-js/core";
import DynamicIslandWidget from "./DynamicIslandWidget.vue"
import {useIpcListener, useWidget} from "@widget-js/vue3";
import {useNotificationStore} from "@/widgets/dynamic-island/store/notification-store";

export default {
  name: "DynamicIslandWidgetView",
  components: {DynamicIslandWidget},
  setup() {
    const {widgetData, widgetParams} = useWidget(WidgetData);
    const notificationStore = useNotificationStore();
    useIpcListener(Channel.NOTIFICATION, (data) => {
      const notification = data as Notification;
      notificationStore.showNotification(notification)
    })
    return {widgetData, widgetParams};
  }
}
</script>

<style scoped>

</style>
