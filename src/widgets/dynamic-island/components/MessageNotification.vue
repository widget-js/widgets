<template>
  <div class="message-notification ">
    <span :class="`icon mgc_${icon} ${type}`"></span>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "info"
  },
  message: {
    type: String,
  }
})

const icon = computed(() => {
  if (props.type == 'error') {
    return "close_circle_line";
  } else if (props.type == 'warning') {
    return "warning_line";
  } else if (props.type == 'info') {
    return "information_line";
  } else if (props.type == 'success') {
    return "check_circle_line"
  }
})

</script>

<style scoped lang="scss">
@import "../scss/notification.scss";

.message-notification {
  display: flex;
  width: $notification-width;
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

    &.success:before {
      color: #67C23A;
    }

    &.error:before {
      color: #F56C6C;
    }

    &.warning:before {
      color: #E6A23C;
    }

    &.info:before {
      color: #909399;
    }

  }
}

</style>
