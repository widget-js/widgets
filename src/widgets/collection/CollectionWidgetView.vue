<template>
    <!-- TODO:组件页面，这里编写组件业务逻辑-->
    <collection-widget></collection-widget>
</template>

<script lang="ts">
import {WidgetData} from "@widget-js/core";
import CollectionWidget from "./CollectionWidget.vue"
import {useWidget} from "@widget-js/vue3";

export default {
    name:"CollectionWidgetView",
    components: {CollectionWidget},
    setup(){
        const {widgetData, widgetParams} = useWidget(WidgetData);
        return {widgetData, widgetParams};
    }
}
</script>

<style scoped>

</style>
