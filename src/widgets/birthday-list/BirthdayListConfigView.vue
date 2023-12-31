<script lang="ts">
import {
  BrowserWindowApi,
  NotificationApi,
  WidgetDataApi,
} from '@widget-js/core'
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidget,
} from '@widget-js/vue3'
import type { BirthdayPeople } from '@/widgets/birthday-list/model/BirthdayListData'
import BirthdayListData from '@/widgets/birthday-list/model/BirthdayListData'

export default {
  name: 'BirthdayListConfigView',
  components: { WidgetEditDialog },
  setup() {
    BrowserWindowApi.setSize(1100, 500)
    BrowserWindowApi.center()
    const widgetConfigOption = new WidgetConfigOption({
      theme: {
        backgroundColor: true,
        borderRadius: false,
      },
    })
    const {
      widgetData,
      widgetParams,
    } = useWidget(BirthdayListData, { loadDataByWidgetName: true })
    return {
      widgetData,
      widgetParams,
      widgetConfigOption,
    }
  },
  methods: {
    /**
     * 点击保存按钮
     */
    async onSaveClick() {
      await this.onApplyClick()
      window.close()
    },

    async onApplyClick() {
      if (this.widgetData.peopleList && this.widgetData.peopleList.length > 0) {
        const names = [] as any[]
        for (const index in this.widgetData.peopleList) {
          if (!this.widgetData.peopleList[index].name) {
            NotificationApi.error(`第${Number.parseInt(index) + 1}行【姓名】不能为空！`)
            return
          }
          if (names.includes(this.widgetData.peopleList[index].name)) {
            NotificationApi.error(
              `第${
                Number.parseInt(index) + 1
              }行与第${
                names.indexOf(this.widgetData.peopleList[index].name) + 1
              }行【姓名】名字重复！`,
            )
            return
          }
          if (!this.widgetData.peopleList[index].month) {
            NotificationApi.error(`第${Number.parseInt(index) + 1}行【月】不能为空！`)
            return
          }
          if (!this.widgetData.peopleList[index].day) {
            NotificationApi.error(`第${Number.parseInt(index) + 1}行【日】不能为空！`)
            return
          }
          names.push(this.widgetData.peopleList[index].name)
        }
      }
      await WidgetDataApi.saveByName(this.widgetData)
    },
    add() {
      const newPeople: BirthdayPeople = {
        name: '',
        type: 'N',
        month: 1,
        day: 1,
        qty: 0,
        createdAt: new Date().getTime(),
      }
      this.widgetData.peopleList.splice(0, 0, newPeople)
    },
    del(scope) {
      this.widgetData.peopleList.splice(scope.$index, 1)
    },
  },
}
</script>

<template>
  <WidgetEditDialog
    v-model="widgetData"
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    @apply="onApplyClick()"
    @confirm="onSaveClick()"
  >
    <template #custom>
      <el-form label-width="120px">
        <el-form-item label="左上角标题">
          <el-input v-model="widgetData.title" maxlength="6" />
        </el-form-item>
      </el-form>
      <el-table
        :data="widgetData.peopleList"
        max-height="250"
        row-key="createdAt"
        style="width: 100%"
        table-layout="auto"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column label="姓名" prop="name" align="center">
          <template #default="scope">
            <el-input v-model="scope.row.name" maxlength="10" />
          </template>
        </el-table-column>
        <el-table-column label="农历" prop="type" align="center">
          <template #default="{ row }">
            <el-radio-group v-model="row.type">
              <el-radio label="Y" size="large">
                农历
              </el-radio>
              <el-radio label="N" size="large">
                公历
              </el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="月" prop="month" align="center">
          <template #default="scope">
            <el-input-number v-model="scope.month" :min="1" :max="12" />
          </template>
        </el-table-column>
        <el-table-column label="日" prop="day" align="center">
          <template #default="scope">
            <el-input-number v-model="scope.day" :min="1" :max="31" />
          </template>
        </el-table-column>
        <el-table-column align="center" width="100">
          <template #header>
            <el-button size="small" type="primary" @click="add">
              新增
            </el-button>
          </template>
          <template #default="scope">
            <el-button size="small" type="danger" @click="del(scope)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </WidgetEditDialog>
</template>

<style scoped></style>
