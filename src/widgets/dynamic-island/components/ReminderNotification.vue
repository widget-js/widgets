<template>
  <div class="message-notification">
    <div class="info">
      <span :class="`icon mgc_${notification.icon}`" v-if="notification.icon"></span>
      <div class="text">
        <div class="title">{{ notification.title }}</div>
        <div class="message">{{ notification.message }}</div>
      </div>
    </div>
    <div class="action">
      <div class="button cancel" @click="cancel" v-if="notification.cancelButtonText">{{
          notification.cancelButtonText
        }}
      </div>
      <div class="button confirm" @click="confirm" v-if="notification.confirmButtonText">
        {{ notification.confirmButtonText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {AppNotification, BroadcastApi, BroadcastEvent, NotificationApi} from "@widget-js/core";

const props = defineProps({
  notification: {
    type: AppNotification,
    required: true
  }
})
const broadcastEvent = new BroadcastEvent("", "cn.widgetjs.notification", props.notification);

const cancel = () => {
  broadcastEvent.type = props.notification.cancelBroadcast ?? "cn.widgetjs.notification.cancel";
  BroadcastApi.sendBroadcastEvent(broadcastEvent)
  NotificationApi.hide();
}

const confirm = () => {
  broadcastEvent.type = props.notification.confirmBroadcast ?? "cn.widgetjs.notification.confirm";
  BroadcastApi.sendBroadcastEvent(broadcastEvent)
  NotificationApi.hide();
}
</script>

<style scoped lang="scss">
@import "../scss/notification.scss";

.message-notification {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-items: center;
  align-content: center;
  justify-content: space-evenly;
  padding-left: 16px;
  padding-right: 16px;

  .action {
    display: flex;
    width: 100%;

    .button {
      flex: 1;
      height: 44px;
      font-size: 18px;
      display: flex;
      align-content: center;
      justify-content: center;
      align-items: center;
      border-radius: 22px;
      font-weight: 500;
      color: white;

      &.cancel {
        background-color: #2C2C2D
      }

      &.confirm {
        color: #5D91D9;
        background-color: #1A1C2D;
      }

      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }

  .info {
    display: flex;
    width: 100%;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;

    .text {
      .title {
        color: white;
        font-size: 16px;
        white-space: nowrap;
        max-width: 280px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .message {
        color: #818383;
        font-size: 16px;
        white-space: nowrap;
        max-width: 280px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

    }
  }

  .icon {
    font-size: 36px;
    margin-right: 16px;

    &:before {
      color: #5D8AC8
    }
  }
}

</style>
