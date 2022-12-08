<template>
  <widget-edit-dialog :title="widgetParams.title" :widget-data="widgetData"
                      :option="widgetConfigOption"
                      @confirm="onSaveClick()"
                      :enable-background="true">
    <template v-slot:widget>
      <!-- 组件配置内容   -->
      <birthday-list-widget :style="{width:`${widgetParams.widthPx}px`,height:`${widgetParams.heightPx}px`}"
                             :border-radius="widgetData.borderRadius"
                             :birthday-list-data="widgetData"
                             :background-color="widgetData.backgroundColor"/>
    </template>
    <template v-slot:form>
      <el-form label-width="120px">
        <el-form-item label="左上角标题">
          <el-input v-model="widgetData.title" maxlength="6"/>
        </el-form-item>
      </el-form>
      <!-- <div style="color: red">注意：目前农历暂不支持，等待后续开放</div> -->
      <el-table :data="widgetData.peopleList" style="width: 100%">
        <el-table-column align="center">
          <template #header>
            <el-button size="small" type="primary" @click="add" >新增</el-button>
          </template>
          <template #default="scope">
            <el-button size="small" type="danger" @click="del(scope)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="序号" align="center">
          <template #default="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="姓名" prop="name" align="center">
          <template #default="{row}">
            <el-input v-model="row.name" maxlength="10"/>
          </template>
        </el-table-column>
        <el-table-column label="农历" prop="type" align="center">
          <template #default="{row}">
            <el-radio-group v-model="row.type">
              <el-radio label="Y" size="large">农历</el-radio>
              <el-radio label="N" size="large">公历</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="月" prop="month" align="center">
          <template #default="{row}">
            <el-input-number v-model="row.month" :min="1" :max="12"/>
          </template>
        </el-table-column>
        <el-table-column label="日" prop="day" align="center">
          <template #default="{row}">
            <el-input-number v-model="row.day" :min="1" :max="31"/>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts">
import {ref} from "vue";
import {NotificationApi, WidgetDataRepository, WidgetParams} from "@widget-js/core";
import BirthdayListWidget from "./BirthdayListWidget.vue";
import BirthdayListData from "@/widgets/birthday-list/model/BirthdayListData";
import {WidgetConfigOption, WidgetEditDialog} from "@widget-js/vue3";

export default {
  name: "BirthdayListConfigView",
  components: {BirthdayListWidget, WidgetEditDialog},
  setup() {
    const widgetConfigOption = new WidgetConfigOption({backgroundColor: true, borderRadius: false})
    //从url地址获取组件参数
    const widgetParams = WidgetParams.fromCurrentLocation();
    //组件默认数据
    const defaultData = new BirthdayListData(widgetParams.name!);
    defaultData.id = widgetParams.id!;
    defaultData.backgroundColor = "#FB604B";
    const widgetData = ref(defaultData);
    //读取保存的数据
    WidgetDataRepository.findByName<BirthdayListData>(widgetParams.name!, BirthdayListData).then((data) => {
      if (data) {
        widgetData.value = data
      }
    })
    return {widgetData, widgetParams, widgetConfigOption}
  },
  methods: {
    /**
     * 点击保存按钮
     */
    async onSaveClick() {
      let that = this;
      if(that.widgetData.peopleList && that.widgetData.peopleList.length > 0){
        var names = [] as any[];
        for(let index in that.widgetData.peopleList){
          if(!that.widgetData.peopleList[index].name){
            NotificationApi.error('第'+(parseInt(index)+1)+'行【姓名】不能为空！')
            return;
          }
          if(names.indexOf(that.widgetData.peopleList[index].name) >= 0){
            NotificationApi.error('第'+(parseInt(index)+1)+'行与第'+(names.indexOf(that.widgetData.peopleList[index].name)+1)+'行【姓名】名字重复！')
            return;
          }
          if(!that.widgetData.peopleList[index].month){
            NotificationApi.error('第'+(parseInt(index)+1)+'行【月】不能为空！')
            return;
          }
          if(!that.widgetData.peopleList[index].day){
            NotificationApi.error('第'+(parseInt(index)+1)+'行【日】不能为空！')
            return;
          }
          names.push(that.widgetData.peopleList[index].name);
        }
      }
      await WidgetDataRepository.saveByName(this.widgetData);
      window.close();
    },
    add(){
      this.widgetData.peopleList.splice(0,0,{name:'', type:'N',month:1,day:1, qty: 0});
    },
    del(scope){
      this.widgetData.peopleList.splice(scope.$index,1);
    }
  },
  watch: {
  }
}


</script>

<style scoped>

</style>
