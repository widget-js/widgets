<template>
    <sit-reminder-widget ></sit-reminder-widget>
</template>

<script lang="ts">
import {WidgetData} from "@widget-js/core";
import SitReminderWidget from "./SitReminderWidget.vue"
import {useWidget} from "@widget-js/vue3";

export default {
    name:"SitReminderWidgetView",
    components: {SitReminderWidget},
    setup(){
        const {widgetData, widgetParams} = useWidget(WidgetData);
        return {widgetData, widgetParams};
    }
}
</script>

<style scoped>

</style>
