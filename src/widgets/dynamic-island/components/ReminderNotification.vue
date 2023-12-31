<script lang="ts" setup>
import {
  AppNotification,
  BroadcastApi,
  BroadcastEvent,
  NotificationApi,
  NotificationApiEvent,
} from '@widget-js/core'

const props = defineProps({
  notification: {
    type: AppNotification,
    required: true,
  },
})

function cancel() {
  const broadcastCancelEvent = new BroadcastEvent({
    event: props.notification.cancelBroadcast ?? NotificationApiEvent.CANCEL,
    payload: JSON.stringify(props.notification),
  })

  BroadcastApi.send(broadcastCancelEvent)
  NotificationApi.hide()
}

function confirm() {
  const broadcastConfirmEvent = new BroadcastEvent({
    event: props.notification.confirmBroadcast ?? NotificationApiEvent.CONFIRM,
    payload: JSON.stringify(props.notification),
  })

  BroadcastApi.send(broadcastConfirmEvent)
  NotificationApi.hide()
}
</script>

<template>
  <div class="message-notification">
    <div class="info">
      <span v-if="notification.icon" :class="`icon mgc_${notification.icon}`" />
      <div class="text">
        <div class="title">
          {{ notification.title }}
        </div>
        <div class="message">
          {{ notification.message }}
        </div>
      </div>
    </div>
    <div class="action">
      <div v-if="notification.cancelButtonText" class="button cancel" @click="cancel">
        {{ notification.cancelButtonText }}
      </div>
      <div v-if="notification.confirmButtonText" class="button confirm" @click="confirm">
        {{ notification.confirmButtonText }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../scss/notification.scss';

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
        background-color: #2c2c2d;
      }

      &.confirm {
        color: #5d91d9;
        background-color: #1a1c2d;
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
      color: #5d8ac8;
    }
  }
}
</style>
