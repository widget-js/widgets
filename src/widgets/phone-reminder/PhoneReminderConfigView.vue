<template>
  <widget-edit-dialog :widget-params="widgetParams" :option="widgetConfigOption"
                      :widget-data="widgetData"
                      @confirm="onSaveClick()">
    <template v-slot:form>
      <el-table :data="widgetData.reminders" :style="{minHeight:'300px'}" style="width: 100%" table-layout="auto">
        <el-table-column prop="title" label="事项" width="100"/>
        <el-table-column prop="enable" label="状态" width="100">
          <template #default="scope">
            <el-switch
                width="60" v-model="scope.row.enable"
                inline-prompt
                active-text="启用"
                inactive-text="禁用"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="提醒人" width="120">
          <template #default="scope">
            <div class="contact">
              <el-avatar size="small"
                         :src="widgetUrl+scope.row.avatar"
              />
              <div class="name">{{ scope.row.name }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="timeSet" label="提醒时间">
          <template #default="scope">
            <el-button @click="pickTime(scope.row)" v-for="item in scope.row.timeSet"
            >{{ item }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="timeSet" label="工作日">
          <template #default="scope">
            <el-checkbox-group v-model="scope.row.workdays">
              <el-checkbox v-for="item in [1,2,3,4,5,6,0]" :label="item">{{
                  dayjs().day(item).locale('zh-cn').format("ddd")
                }}
              </el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column label="试听">
          <template #default="scope">
            <el-button @click="listen(scope.row)" type="primary" circle>
              <template #icon>
                <span class="icon mgc_headphone_line"></span>
              </template>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <time-picker-dialog @confirm="onPickTimeConfirm" v-model:date="time" v-model:visible="showTimePicker"/>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts">

import PhoneReminderWidget from "./PhoneReminderWidget.vue";
import {useWidget, WidgetConfigOption, WidgetEditDialog} from "@widget-js/vue3";
import {NotificationApi, WidgetApi} from "@widget-js/core";
import {reactive, ref} from "vue";
import {PhoneReminder, PhoneReminderData} from "@/widgets/phone-reminder/model/PhoneReminder";
import PhoneReminderWidgetDefine from "@/widgets/phone-reminder/PhoneReminder.widget";
import TimePickerDialog from "@/components/TimePickerDialog.vue";
import 'dayjs/locale/zh-cn'
import dayjs from "dayjs";

let phoneReminder: PhoneReminder;
export default {
  name: "",
  computed: {
    dayjs() {
      return dayjs
    }
  },
  components: {TimePickerDialog, PhoneReminderWidget, WidgetEditDialog},
  setup() {
    const phoneReminderData = new PhoneReminderData(PhoneReminderWidgetDefine.name);
    const {widgetData, widgetParams} = useWidget(PhoneReminderData, {
      defaultData: phoneReminderData,
      loadDataByWidgetName: true
    })
    //修改成需要设置组件参数配置
    const widgetConfigOption = reactive(new WidgetConfigOption({
      custom: true,
      backgroundColor: false,
      borderRadius: false,
      preview: false
    }));
    const showTimePicker = ref(false);
    const widgetUrl = ref("");
    const time = ref(new Date());
    WidgetApi.getWidgetPackageUrl("cn.widgetjs.widgets").then(url => {
      widgetUrl.value = url!;
    })
    return {widgetData, time, showTimePicker, widgetParams, widgetUrl, widgetConfigOption}
  },
  methods: {
    onPickTimeConfirm() {
      phoneReminder.timeSet[0] = dayjs(this.time).format("HH:mm");
    },
    pickTime(reminder: PhoneReminder) {
      phoneReminder = reminder;
      const date = reminder.getTimes()[0];
      this.time = date;
      this.showTimePicker = true;
    },
    async listen(reminder: PhoneReminder) {
      const appNotification = await reminder.toNotification();
      await NotificationApi.send(appNotification);
    },
    async onSaveClick() {
      // this.widgetData.reset();
      await WidgetApi.saveDataByName(this.widgetData);
      window.close();
    }
  }
}
</script>

<style scoped lang="scss">
.contact {
  display: flex;
  justify-items: center;
  text-align: center;

  .name {
    margin-left: 4px;
  }
}

.el-checkbox {
  margin-right: 12px;
}

.icon {
  &:before {
    color: white;
  }
}
</style>
