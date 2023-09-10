<template>
  <div class="picker-group">
    <el-dialog v-model="visibleModel" :modal="false" :show-close="false" @opened="opened = true" @closed="opened= false">
      <template #header="{ close, titleId, titleClass }">
        <div class="header">
          <el-radio-group v-model="isLunarModel" label="label position">
            <el-radio-button :label="false">公历</el-radio-button>
            <el-radio-button :label="true">农历</el-radio-button>
          </el-radio-group>
        </div>
      </template>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="visibleModel = false">取消</el-button>
        <el-button type="primary" @click="visibleModel = false">
          确定
        </el-button>
      </span>
      </template>
      <template v-if="opened">
        <lunar-date-picker v-if="isLunarModel" v-model:date="dateModel"></lunar-date-picker>
        <solar-date-picker v-else v-model:date="dateModel"></solar-date-picker>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {computed, nextTick, onMounted, ref} from "vue";
import 'vue-scroll-picker/lib/style.css'
import SolarDatePicker from "@/components/SolarDatePicker.vue";
import LunarDatePicker from "@/components/LunarDatePicker.vue";

const isLunar = ref(false);
const opened = ref(false)
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    required: true
  },
  isLunar: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(['update:visible', 'update:date', 'update:isLunar'])

onMounted(async () => {
  await nextTick();
})
const visibleModel = computed({
  get: () => {
    return props.visible
  },
  set: (value) => {
    emits('update:visible', value)
  }
})

const dateModel = computed({
  get: () => {
    return props.date
  },
  set: (value) => {
    emits('update:date', value)
  }
})

const isLunarModel = computed({
  get: () => {
    return props.isLunar
  },
  set: (value) => {
    emits('update:isLunar', value)
  }
})
</script>

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
