<script lang="ts">
export default {
  name: 'LyricFooter',
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  emits: ['next', 'previous', 'hover', 'leave'],
}
</script>

<template>
  <div class="footer">
    <el-progress :percentage="progress" :show-text="false" color="#1ecf9d" />
    <div class="buttons">
      <div class="icon shuffle mgc_shuffle_line" />
      <div id="hotspot" class="hotspot" @mouseenter="$emit('hover')" @mouseleave="$emit('leave')">
        <div class="icon previous mgc_left_line" @click="$emit('previous')" />
        <div class="icon play mgc_pause_line" />
        <div
          class="icon next mgc_right_line"
          @click="$emit('next')"
        />
      </div>
      <div class="icon volume mgc_volume_line" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  position: absolute;
  width: 80%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  right: 0;
  bottom: 32px;
  margin: auto;

  .icon {
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 6px;
    font-size: 24px;
    transition-duration: 0.3s;
    transition-property: background-color;
    background-color: transparent;
    border-radius: 50%;
    cursor: pointer;

    &:before {
      color: white;
    }

    &:hover {
      background-color: #1ecf9d;
    }
  }

  .buttons {
    margin-top: 12px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .hotspot {
      display: flex;
    }

    .play {
      background-color: #1ecf9d;
      border-radius: 50%;
    }
  }
}
</style>
