<template>
  <countdown-widget v-bind="widgetData" :style="{...sizeStyle}" :font-size="fontSize"></countdown-widget>
</template>

<script lang="ts">
import CountdownWidget from "./CountdownWidget.vue"
import {useWidget} from "@widget-js/vue3";
import {CountdownModel} from "@/widgets/countdown/model/CountdownModel";
import CountdownWidgetDefine from "./Countdown.widget";
import {ref} from "vue";

export default {
  name: "CountdownWidgetView",
  components: {CountdownWidget},
  setup() {
    const defaultData = new CountdownModel(CountdownWidgetDefine.name);
    const {widgetData, widgetParams,sizeStyle} = useWidget(CountdownModel, {
      defaultData: defaultData
    });
    const fontSize = ref(54);
    if(widgetParams.preview){
      fontSize.value = 36
    }
    return {widgetData, widgetParams,sizeStyle,fontSize};
  }
}
</script>

<style scoped>

</style>
