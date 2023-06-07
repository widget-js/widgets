<template>
  <div class="break-view">
    <div class="countdown">
      <template v-for="(item,index) in array">
        <text-switcher :text="item" :font-size="item === ':' ? 150:300"/>
      </template>
    </div>
    <p>按Esc退出</p>
  </div>
</template>

<script lang="ts">
import {onKeyStroke, useIntervalFn} from "@vueuse/core";
import {ref} from "vue";
import TextSwitcher from "@/widgets/sit-reminder/TextSwitcher.vue";
import '@/common/dayjs-extend'
import dayjs from "dayjs";
import { useRouteQuery} from "@vueuse/router";

export default {
  name: "BreakView",
  components: {TextSwitcher},
  setup() {
    const i = ref(0);
    const duration = useRouteQuery('duration', `${5 * 60}`);
    console.log(window.location);
    console.log(duration);
    const targetTime = dayjs().add(parseInt(duration.value), 'second');
    const array = ref<string[]>();
    useIntervalFn(() => {
      const remindDuration = dayjs.duration(targetTime.diff(dayjs()))
      if (remindDuration.asSeconds() <= 0) {
        window.close()
      }
      const timeStr = remindDuration.format("mm:ss");
      array.value = timeStr.split('');
      i.value++;
    }, 1000, {immediate: true});

    onKeyStroke('Escape', (e) => {
      window.close();
    })
    return {array}
  }
}
</script>

<style scoped lang="scss">

.break-view {
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;

  .text-switcher {
    color: white;
  }

  .countdown {
    display: flex;
    flex-direction: row;
    align-items: center;
    letter-spacing: 16px;
    font-weight: bold;
    outline: none;

    .number {
      font-size: 258px;
    }

    .colon {
      font-size: 128px;
    }
  }

}
</style>
