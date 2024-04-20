<script lang="ts" setup>
import {
  Delete,
  Edit,
} from '@icon-park/vue-next'
import { Todo } from '@/widgets/todo-list/model/TodoListData'

const props = defineProps({
  todo: {
    type: Todo,
    required: true,
  },
  editable: { type: Boolean },
})

const emits = defineEmits(['finish', 'edit', 'delete'])

function finish() {
  emits('finish', props.todo)
}

function edit() {
  emits('edit', props.todo)
}

function deleteTodo() {
  emits('delete', props.todo)
}
</script>

<template>
  <div class="todo-item">
    <div class="flex items-center">
      <ElCheckbox :checked="todo.isFinished()" @click="finish">
        <span />
      </ElCheckbox>
      <div class="todo" style="line-height: 1.2">
        <p class="w-75" :style=" { 'text-decoration': todo.isFinished() ? 'line-through' : 'none' }">
          {{ todo.title }}
        </p>
      </div>
      <div class="actions flex items-center">
        <div
          v-if="editable"
          class="icon click-spot flex justify-center"
          style="height: 100%; width: 24px"
          @click.stop="edit"
        >
          <Edit class="edit" />
        </div>
        <div class="icon delete" @click.stop="deleteTodo">
          <Delete />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-checkbox.is-checked {
  .todo {
    text-decoration-line: line-through;
  }
}

p {
  font-weight: normal;
  margin: 0;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.todo-item {
  padding: 4px 8px;
  border-bottom: 1px solid var(--widget-divider-color);

  &:hover {
    .actions {
      opacity: 1;
    }
  }

  .actions {
    cursor: pointer;
    margin-left: auto;
    opacity: 0;
    gap: 16px;
    right: 16px;
    border-radius: 4px;
    padding: 4px 8px ;
    position: absolute;
    background: var(--widget-background-color);
    .icon:hover {
      scale: 1.2;
    }
  }
}
</style>
