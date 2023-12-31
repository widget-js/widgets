<script setup lang="ts">
import TodoItem from '@/widgets/todo-list/components/TodoItem.vue'
import { useTodoStore } from '@/widgets/todo-list/model/useTodoStore'

const todoStore = useTodoStore()
</script>

<template>
  <div class="list">
    <template v-for="(item) in todoStore.finishedTodos" :key="`history-${item.id}`">
      <TodoItem :todo="item" @finish="todoStore.reTodo(item)" @delete=" todoStore.deleteTodo(item)" />
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
