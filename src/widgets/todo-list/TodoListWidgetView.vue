<script lang="ts" setup>
import { ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import type {
  Todo,
  TodoUpdate,
} from '@/widgets/todo-list/model/TodoListData'
import EditBox from '@/widgets/todo-list/components/EditBox.vue'
import TodoList from '@/widgets/todo-list/components/TodoList.vue'
import FinishedTodoList from '@/widgets/todo-list/components/FinishedTodoList.vue'
import { useTodoStore } from '@/widgets/todo-list/model/useTodoStore'

type ViewType = 'default' | 'edit' | 'history'
const viewType = ref<ViewType>('default')

const todoStore = useTodoStore()

const root = ref<HTMLElement>()

const editBox = ref<typeof EditBox>()
const { height } = useElementSize(root)

function edit(todo: Todo) {
  editBox.value!.setTodo(todo)
  viewType.value = 'edit'
}

function saveTodo(data: TodoUpdate) {
  viewType.value = 'default'
  todoStore.saveTodo(data)
}
</script>

<template>
  <widget-wrapper>
    <div ref="root" class="todo-list-widget">
      <div class="header">
        <div class="title">
          {{ viewType === 'history' ? '历史记录' : '待办事项' }}
        </div>
        <div class="actions">
          <span v-if="viewType === 'history'" class="icon mgc_back_line" @click="viewType = 'default'" />
          <span v-else class="icon mgc_history_line" @click="viewType = 'history'" />
          <span class="icon mgc_add_circle_line" @click="viewType = 'edit'" />
        </div>
      </div>
      <!-- list-body设置高度，解决todo拖动会导致视图上升，这个不知道是electron bug，还是文档流设置不当导致的      -->
      <div class="list-body" :height="height - 48">
        <el-scrollbar :height="height - 48">
          <TodoList
            v-show="viewType === 'default'"
            :todos="todoStore.todos"
            :finished-todos="todoStore.finishedTodos"
            @update="todoStore.save"
            @edit="edit"
          />

          <FinishedTodoList
            v-show="viewType === 'history'"
            :finished-todos="todoStore.finishedTodos"
            :todos="todoStore.todos"
            @update="todoStore.save"
          />
          <EditBox v-show="viewType === 'edit'" ref="editBox" @cancel="viewType = 'default'" @save="saveTodo($event)" />
        </el-scrollbar>
      </div>
    </div>
  </widget-wrapper>
</template>

<style scoped lang="scss">
.todo-list-widget {
  background-color: var(--widget-background-color);
  border-radius: var(--widget-border-radius);
  font-weight: bold;
  width: 100%;
  height: 100%;

  .header {
    align-items: center;
    padding: 8px 16px;
    display: flex;
    border-bottom: solid 1px var(--widget-divider-color);

    .title {
      flex-grow: 1;
      font-size: 1.1rem;
      color: var(--widget-color);
    }

    .actions {
      .icon {
        cursor: pointer;

        &:not(:last-child) {
          margin-right: 8px;
        }

        &:before {
          color: var(--widget-color);
          font-size: 24px;
        }
      }
    }
  }

  .list-body {
    position: relative;
    color: var(--widget-color);
    font-size: 1.1rem;

    .list {
      width: 100%;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
