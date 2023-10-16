<script setup lang="ts">
import TodoItem from '@/widgets/todo-list/components/TodoItem.vue'
import { PropType, ref, watch, watchEffect } from 'vue'
import { Todo } from '@/widgets/todo-list/model/TodoListData'
import { useSortable } from '@vueuse/integrations/useSortable'
import { delay } from '@/util/TimeUtils'

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

const ringtone = ref<HTMLAudioElement>()
const emits = defineEmits(['update', 'edit'])
const deleteTodo = (todo: Todo) => {
  props.todos.splice(props.todos.indexOf(todo), 1)
  emits('update', props.todos)
}

const todoItemClick = (todo: Todo) => {
  // props.todos.splice(props.todos.indexOf(todo), 1)
  todo.finishedAt = new Date().toISOString()
  // props.finishedTodos.splice(0, 0, todo)
  // emits('update')
  const clone = ringtone.value!.cloneNode(true) as HTMLAudioElement
  clone.play()
}

const edit = (todo: Todo) => {
  emits('edit', todo)
}

const listRef = ref<HTMLElement>()
const { option } = useSortable(listRef, props.todos, {
  animation: 150,
  onEnd: async () => {
    await delay(300)
    for (let i = 0; i < props.todos.length; i++) {
      props.todos[i].order = i
    }
    emits('update', props.todos)
  }
})
</script>

<template>
  <div class="wrapper">
    <audio ref="ringtone" src="./audio/ding.mp3"></audio>
    <div class="list" ref="listRef">
      <div v-for="item in todos" :key="item.id">
        <TodoItem @finish="todoItemClick(item)" @delete="deleteTodo(item)" editable @edit="edit(item)" :todo="item" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
