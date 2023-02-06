<template>
    <glitch-widget :style="sizeStyle"></glitch-widget>
</template>

<script lang="ts">
import {WidgetData} from "@widget-js/core";
import GlitchWidget from "./GlitchWidget.vue"
import {useWidget} from "@widget-js/vue3";

export default {
    name:"GlitchWidgetView",
    components: {GlitchWidget},
    setup(){
        const {widgetData, widgetParams,sizeStyle} = useWidget(WidgetData);
        return {widgetData, widgetParams,sizeStyle};
    }
}
</script>

<style scoped>

</style>
