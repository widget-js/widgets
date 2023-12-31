<script lang="ts" setup>
import { ref } from 'vue'
import type { Todo } from '@/widgets/todo-list/model/TodoListData'

const emits = defineEmits(['cancel', 'save'])

const content = ref('')

function cancel() {
  emits('cancel')
  reset()
}

const todo = ref<Todo | undefined>(undefined)

function setTodo(newTodo: Todo) {
  todo.value = newTodo
  content.value = newTodo.content
}

function reset() {
  content.value = ''
  todo.value = undefined
}

function confirm() {
  emits('save', {
    content: content.value,
    todo: todo.value,
  })
  reset()
}

defineExpose({ setTodo })
</script>

<template>
  <div class="add-body">
    <el-form label-position="top">
      <ElInput
        v-model="content"
        type="textarea"
        class="todo-input"
        maxlength="120"
        :autosize="{ minRows: 2, maxRows: 6 }"
        placeholder="请输入待办内容,按 Shift+Enter 直接保存"
        @keydown.shift.enter="confirm"
      />
      <!--      <el-form-item label="重复设置" > -->
      <!--        <el-radio-group> -->
      <!--          <el-radio>每天</el-radio> -->
      <!--          <el-radio>每周</el-radio> -->
      <!--          <el-radio>每月</el-radio> -->
      <!--          <el-radio>每年</el-radio> -->
      <!--        </el-radio-group> -->
      <!--      </el-form-item> -->
      <div class="buttons">
        <ElButton @click="cancel">
          取消
        </ElButton>
        <ElButton type="primary" @click="confirm">
          保存
        </ElButton>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.add-body {
  padding: 16px;

  .todo-input {
    font-weight: normal;
    margin-bottom: 8px;
  }

  .buttons {
    margin-top: 16px;
    display: flex;

    button {
      flex: 1;
    }
  }
}
</style>
