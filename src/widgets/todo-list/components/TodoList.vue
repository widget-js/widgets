<script setup lang="ts">
import { ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import TodoItem from '@/widgets/todo-list/components/TodoItem.vue'
import type { Todo } from '@/widgets/todo-list/model/TodoListData'
import { delay } from '@/util/TimeUtils'
import { useTodoStore } from '@/widgets/todo-list/model/useTodoStore'

const emits = defineEmits(['update', 'edit'])
const todoStore = useTodoStore()
const ringtone = ref<HTMLAudioElement>()

function finishTodo(todo: Todo) {
  todoStore.finishTodo(todo)
  const clone = ringtone.value!.cloneNode(true) as HTMLAudioElement
  clone.play()
}

function edit(todo: Todo) {
  emits('edit', todo)
}

const listRef = ref<HTMLElement>()
useSortable(listRef, todoStore.todos, {
  animation: 150,
  onEnd: async () => {
    await delay(300)
    for (let i = 0; i < todoStore.todos.length; i++) {
      todoStore.todos[i].order = i
    }

    todoStore.save()
  },
})
</script>

<template>
  <div class="wrapper">
    <audio ref="ringtone" src="./audio/ding.mp3" />
    <div ref="listRef" class="list">
      <div v-for="item in todoStore.todos" :key="item.id">
        <TodoItem
          editable :todo="item" @finish="finishTodo(item)" @delete="todoStore.deleteTodo(item)"
          @edit="edit(item)"
        />
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
