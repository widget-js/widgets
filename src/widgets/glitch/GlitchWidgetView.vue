<template>
    <!-- TODO:组件页面，这里编写组件业务逻辑-->
    <glitch-widget :background-color="widgetData.backgroundColor"></glitch-widget>
</template>

<script lang="ts">
import {WidgetData} from "@widget-js/core";
import GlitchWidget from "./GlitchWidget.vue"
import {useWidget} from "@widget-js/vue3";

export default {
    name:"GlitchWidgetView",
    components: {GlitchWidget},
    setup(){
        const {widgetData, widgetParams} = useWidget(WidgetData);
        return {widgetData, widgetParams};
    }
}
</script>

<style scoped>

</style>
