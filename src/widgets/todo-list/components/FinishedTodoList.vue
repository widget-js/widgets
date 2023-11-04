<script setup lang="ts">
import TodoItem from '@/widgets/todo-list/components/TodoItem.vue'
import { PropType } from 'vue'
import { Todo } from '@/widgets/todo-list/model/TodoListData'

const props = defineProps({
  todos: {
    type: Array as PropType<Todo[]>,
    default: () => []
  },
  finishedTodos: {
    type: Array as PropType<Todo[]>,
    default: () => []
  }
})
const emits = defineEmits(['update'])
const finishTodoItemClick = (todo: Todo) => {
  todo.dueDateTime = undefined
  todo.order = 0
  props.finishedTodos.splice(props.finishedTodos.indexOf(todo), 1)
  props.todos.splice(0, 0, todo)
  emits('update', props.finishedTodos)
}

const deleteTodo = (todo: Todo) => {
  props.finishedTodos.splice(props.finishedTodos.indexOf(todo), 1)
  emits('update')
}
</script>

<template>
  <div class="list">
    <template v-for="(item, index) in finishedTodos" :key="`history-${item.id}`">
      <TodoItem @finish="finishTodoItemClick(item)" @delete="deleteTodo(item)" :todo="item"></TodoItem>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
