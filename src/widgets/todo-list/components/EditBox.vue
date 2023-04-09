<template>
  <div class="add-body">
    <ElInput
      v-model="content"
      type="textarea"
      class="todo-input"
      maxlength="120"
      @keydown.shift.enter="confirm"
      :autosize="{ minRows: 2, maxRows: 6 }"
      placeholder="请输入代办内容,按 Shift+Enter 直接保存"></ElInput>
    <div class="buttons">
      <ElButton @click="cancel">取消</ElButton>
      <ElButton type="primary" @click="confirm">保存</ElButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Todo } from '@/widgets/todo-list/model/TodoListData'

const props = defineProps({
  id: {
    type: Number,
    required: false
  }
})
const content = ref('')
const emits = defineEmits(['cancel', 'save'])
const cancel = () => {
  emits('cancel')
  reset()
}
const confirm = () => {
  emits('save', {
    content: content.value,
    todo: todo.value
  })
  reset()
}

const reset = () => {
  content.value = ''
  todo.value = undefined
}
const todo = ref<Todo | undefined>(undefined)
const setTodo = (newTodo: Todo) => {
  todo.value = newTodo
  content.value = newTodo.content
}

defineExpose({ setTodo })
</script>

<style scoped lang="scss">
.add-body {
  .todo-input {
    font-weight: normal;
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
