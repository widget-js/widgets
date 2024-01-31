<script lang="ts" setup>
import { ref } from 'vue'
import 'vue-scroll-picker/lib/style.css'
import { useVModels } from '@vueuse/core'
import TimePicker from '@/components/TimePicker.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Date,
    required: true,
  },
})

const emits = defineEmits(['update:visible', 'update:modelValue', 'confirm'])
const {
  visible,
  modelValue,
} = useVModels(props, emits)
const opened = ref(false)

function confirm() {
  visible.value = false
  emits('confirm', modelValue.value)
}
</script>

<template>
  <div class="picker-group">
    <el-dialog
      v-model="visible"
      :modal="false" title="选择时间" :show-close="false" @opened="opened = true"
      @closed="opened = false"
    >
      <TimePicker v-if="opened" v-model="modelValue" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="confirm">
            确定
          </el-button>
        </span>
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
