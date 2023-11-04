<template>
  <ElCard body-style="padding:2px 8px" shadow="hover" class="todo-item">
    <div class="flex items-center">
      <ElCheckbox @click="finish" :checked="todo.isFinished()">
        <span></span>
      </ElCheckbox>
      <div class="todo" style="line-height: 1.2">
        <p :style="  {'text-decoration': todo.isFinished() ? 'line-through':'none'}">{{ todo.title }}</p>
      </div>
      <div class="actions flex items-center gap-2">
        <div
          v-if="editable"
          @click.stop="edit"
          class="click-spot flex justify-center"
          style="height: 100%; width: 24px">
          <Edit class="edit" />
        </div>
        <div class="delete" @click.stop="deleteTodo">
          <Delete />
        </div>
      </div>
    </div>
  </ElCard>
</template>

<script lang="ts" setup>
import { Todo } from '@/widgets/todo-list/model/TodoListData'
import { Delete, Edit } from '@icon-park/vue-next'

const props = defineProps({
  todo: {
    type: Todo,
    required: true
  },
  editable: {
    type: Boolean
  }
})

const emits = defineEmits(['finish', 'edit', 'delete'])

const finish = () => {
  emits('finish', props.todo)
}

const edit = () => {
  emits('edit', props.todo)
}

const deleteTodo = () => {
  emits('delete', props.todo)
}
</script>

<style scoped lang="scss">
.el-checkbox.is-checked {
  .todo {
    color: #9c9c9c;
    text-decoration-line: line-through;
  }
}

p {
  font-weight: normal;
  margin: 0;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.todo {
  width: 75%;
}

.todo-item {
  padding: 4px 8px;
  border-radius: 8px;
  background-color: white;

  &:hover {
    .actions {
      opacity: 1;
    }
  }

  .actions {
    cursor: pointer;
    margin-left: auto;
    opacity: 0;
  }
}
</style>
