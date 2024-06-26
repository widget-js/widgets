<script lang="ts">
import dayjs from 'dayjs'
import { WidgetConfigOption, WidgetEditDialog, useWidgetData } from '@widget-js/vue3'
import { BrowserWindowApi, NotificationApi, WidgetApi } from '@widget-js/core'
import { ref } from 'vue'
import { Headset } from '@icon-park/vue-next'
import consola from 'consola'
import type { PhoneReminder } from '@/widgets/phone-reminder/model/PhoneReminder'
import { PhoneReminderData } from '@/widgets/phone-reminder/model/PhoneReminder'
import PhoneReminderWidgetDefine from '@/widgets/phone-reminder/PhoneReminder.widget'
import TimePickerDialog from '@/components/TimePickerDialog.vue'
import 'dayjs/locale/zh-cn'

let phoneReminder: PhoneReminder
export default {
  name: '',
  components: {
    TimePickerDialog,
    WidgetEditDialog,
    Headset,
  },
  setup() {
    BrowserWindowApi.setup({
      center: true,
      width: 1000,
      height: 600,
    })
    const phoneReminderData = new PhoneReminderData(PhoneReminderWidgetDefine.name)
    const {
      widgetData,
      widgetParams,
      save,
    } = useWidgetData(PhoneReminderData, {
      defaultData: phoneReminderData,
      widgetName: PhoneReminderWidgetDefine.name,
      loadDataByWidgetName: true,
    })

    const widgetConfigOption = new WidgetConfigOption({
      custom: true,
    })

    const showTimePicker = ref(false)
    const widgetUrl = ref('')
    const time = ref(new Date())
    WidgetApi.getWidgetPackageUrl('cn.widgetjs.widgets').then((url) => {
      widgetUrl.value = url!
    })
    return {
      widgetData,
      time,
      showTimePicker,
      save,
      widgetParams,
      widgetUrl,
      widgetConfigOption,
    }
  },
  computed: {
    dayjs() {
      return dayjs
    },
  },
  methods: {
    onPickTimeConfirm(time: Date) {
      consola.info('onPickTimeConfirm', time)
      phoneReminder.timeSet[0] = dayjs(time).format('HH:mm')
    },
    pickTime(reminder: PhoneReminder) {
      phoneReminder = reminder
      this.time = reminder.getTimes()[0]
      this.showTimePicker = true
    },
    async listen(reminder: PhoneReminder) {
      const appNotification = await reminder.toNotification()
      await NotificationApi.send(appNotification)
    },
  },
}
</script>

<template>
  <WidgetEditDialog
    id="test"
    v-model="widgetData"
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    @apply="save"
    @confirm="save({ closeWindow: true })"
  >
    <template #custom>
      <el-table :data="widgetData.reminders" :style="{ minHeight: '300px' }" style="width: 100%" table-layout="auto">
        <el-table-column prop="title" label="事项" width="100" />
        <el-table-column prop="enable" label="状态" width="100">
          <template #default="scope">
            <el-switch v-model="scope.row.enable" width="60" inline-prompt active-text="启用" inactive-text="禁用" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="提醒人" width="120">
          <template #default="scope">
            <div class="contact">
              <el-avatar size="small" :src="widgetUrl + scope.row.avatar" />
              <div class="name">
                {{ scope.row.name }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="timeSet" label="提醒时间">
          <template #default="scope">
            <el-button v-for="item in scope.row.timeSet" :key="`alert-time-${item}`" @click="pickTime(scope.row)">
              {{ item }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="timeSet" label="工作日">
          <template #default="scope">
            <el-checkbox-group v-model="scope.row.workdays">
              <el-checkbox v-for="item in [1, 2, 3, 4, 5, 6, 0]" :key="`checkbox-${item}`" :label="item">
                {{ dayjs().day(item).locale('zh-cn').format('ddd') }}
              </el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column label="试听">
          <template #default="scope">
            <el-button type="primary" circle @click="listen(scope.row)">
              <template #icon>
                <Headset />
              </template>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <TimePickerDialog v-model="time" v-model:visible="showTimePicker" @confirm="onPickTimeConfirm" />
    </template>
  </WidgetEditDialog>
</template>

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
