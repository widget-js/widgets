<script lang="ts" setup>
import {
  ref,
} from 'vue'
import 'vue-scroll-picker/lib/style.css'
import { useVModel } from '@vueuse/core'
import SolarDatePicker from '@/components/SolarDatePicker.vue'
import LunarDatePicker from '@/components/LunarDatePicker.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  lunar: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:visible', 'update:modelValue', 'update:lunar', 'confirm'])
const opened = ref(false)
const model = useVModel(props, 'modelValue', emits)

const isLunar = ref(props.lunar)
const dateModel = ref(props.date)

function onConfirmClick() {
  model.value = false
  emits('confirm', dateModel.value, isLunar.value)
}
</script>

<template>
  <div class="picker-group">
    <el-dialog
      v-model="model" :modal="false" :show-close="false" @opened="opened = true"
      @closed="opened = false"
    >
      <div class="header">
        <el-radio-group v-model="isLunar" label="label position">
          <el-radio-button :label="false">
            公历
          </el-radio-button>
          <el-radio-button :label="true">
            农历
          </el-radio-button>
        </el-radio-group>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="model = false">取消</el-button>
          <el-button type="primary" @click="onConfirmClick">
            确定
          </el-button>
        </span>
      </template>
      <template v-if="opened">
        <LunarDatePicker v-if="isLunar" v-model="dateModel" />
        <SolarDatePicker v-else v-model="dateModel" />
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-items: center;
  justify-content: center;
}

.el-dialog__header {
  padding: 0;
}
</style>
