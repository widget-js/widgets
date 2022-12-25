<template>
  <notification-container :show="show" :size="size" :background-color="backgroundColor">
    <phone-call-notification v-if="type === 'call'" v-bind="$props"/>
    <counting-notification v-else-if="type === 'countdown'" v-bind="$props"/>
    <seat-alert-notification v-else-if="type === 'alert'" v-bind="$props"/>
    <advance-countdown-notification v-else-if="type === 'advance-countdown'" v-bind="$props"/>
    <message-notification v-else v-bind="$props"/>
  </notification-container>
</template>

<script lang="ts">
import AdvanceCountdownNotification from "@/widgets/dynamic-island/components/AdvanceCountdownNotification.vue";
import PhoneCallNotification from "@/widgets/dynamic-island/components/PhoneCallNotification.vue";
import MessageNotification from "@/widgets/dynamic-island/components/MessageNotification.vue";
import CountingNotification from "@/widgets/dynamic-island/components/CountingNotification.vue";
import NotificationContainer from "@/widgets/dynamic-island/components/NotificationContainer.vue";
import dayjs from "dayjs";
import SeatAlertNotification from "@/widgets/dynamic-island/components/SeatAlertNotification.vue";

export default {
  name: "DynamicIslandWidget",
  components: {
    SeatAlertNotification,
    MessageNotification,
    AdvanceCountdownNotification, CountingNotification, PhoneCallNotification, NotificationContainer
  },
  props: {
    type: {
      type: String
    },
    message: {
      type: String
    },
    backgroundColor: {
      type: String
    },
    size: {
      type: String,
      default: "default"
    },
    show: {
      type: Boolean,
    },
    targetTime: {
      type: String,
      default: dayjs().toISOString(),
      required: false,
    },
    title: {
      type: String
    }
  },
  watch: {
    show(newValue, oldValue) {
      console.log(newValue)
    }
  }
}


</script>

<style scoped>
</style>
