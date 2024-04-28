<script lang="ts" setup>
import { IconPark } from '@icon-park/vue-next/es/all'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  message: { type: String },
})
</script>

<template>
  <div class="message-notification ">
    <IconPark :class="`icon ${props.type}`" :type="type" theme="outline" />
    <div class="message">
      {{ message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/notification.scss";

.message-notification {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;

  .message {
    color: white;
    font-size: 16px;
    white-space: nowrap;
    max-width: 280px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;

    &.success {
      color: #67C23A;
    }

    &.error {
      color: #F56C6C;
    }

    &.warning {
      color: #E6A23C;
    }

    &.info {
      color: #909399;
    }

  }
}
</style>
