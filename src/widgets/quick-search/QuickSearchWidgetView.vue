 <template>
    <!-- TODO:组件页面，这里编写组件业务逻辑-->
    <quick-search-widget :background-color="widgetData.backgroundColor"></quick-search-widget>
</template>

<script lang="ts">
import {WidgetData} from "@widget-js/core";
import QuickSearchWidget from "./QuickSearchWidget.vue"
import {useWidget} from "@widget-js/vue3";

export default {
    name:"QuickSearchWidgetView",
    components: {QuickSearchWidget},
    setup(){
        const {widgetData, widgetParams} = useWidget(WidgetData);
        return {widgetData, widgetParams};
    }
}
</script>

<style scoped>

</style>
