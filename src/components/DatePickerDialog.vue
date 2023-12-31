<script lang="ts" setup>
import {
  nextTick,
  onMounted,
  ref,
} from 'vue'
import 'vue-scroll-picker/lib/style.css'
import { useVModels } from '@vueuse/core'
import SolarDatePicker from '@/components/SolarDatePicker.vue'
import LunarDatePicker from '@/components/LunarDatePicker.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Date,
    required: true,
  },
  lunar: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:visible', 'update:modelValue', 'update:lunar'])
const opened = ref(false)
const {
  visible,
  modelValue,
  lunar,
} = useVModels(props, emits)
onMounted(async () => {
  await nextTick()
})
</script>

<template>
  <div class="picker-group">
    <el-dialog
      v-model="visible" :modal="false" :show-close="false" @opened="opened = true"
      @closed="opened = false"
    >
      <div class="header">
        <el-radio-group v-model="lunar" label="label position">
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
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="visible = false">
            确定
          </el-button>
        </span>
      </template>
      <template v-if="opened">
        <LunarDatePicker v-if="lunar" v-model="modelValue" />
        <SolarDatePicker v-else v-model="modelValue" />
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
