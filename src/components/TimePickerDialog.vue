<template>
  <div class="picker-group">
    <el-dialog title="选择时间" v-model="visibleModel" :show-close="false" @opened="opened = true"
               @closed="opened= false">
      <time-picker v-if="opened" v-model:date="dateModel"/>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="visibleModel = false">取消</el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {computed, nextTick, onMounted, ref, watch} from "vue";
import 'vue-scroll-picker/lib/style.css'
import TimePicker from "@/components/TimePicker.vue";

const opened = ref(false)
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    required: true
  }
});
const emits = defineEmits(['update:visible', 'update:date', 'confirm'])
const confirm = () => {
  visibleModel.value = false;
  emits('confirm');
}
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
