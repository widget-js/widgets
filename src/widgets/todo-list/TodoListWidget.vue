<template>
  <div class="todo-list-widget" ref="root">
    <div class="header">
      <div class="title">
        {{ viewType === 'history' ? '历史记录' : '待办事项' }}
      </div>
      <div class="actions">
        <span class="icon mgc_back_line" v-if="viewType === 'history'" @click="viewType = 'default'"></span>
        <span class="icon mgc_history_line" v-else @click="viewType = 'history'"></span>
        <span class="icon mgc_add_circle_line" @click="viewType = 'edit'"></span>
      </div>
    </div>
    <!-- list-body设置高度，解决todo拖动会导致视图上升，这个不知道是electron bug，还是文档流设置不当导致的      -->
    <div class="list-body" :height="height - 48">
      <el-scrollbar :height="height - 48">
        <todo-list
          :todos="todos"
          @update="update"
          :finished-todos="finishedTodos"
          v-show="viewType === 'default'"
          @edit="edit"></todo-list>

        <finished-todo-list
          v-show="viewType === 'history'"
          :finished-todos="finishedTodos"
          :todos="todos"
          @update="update"></finished-todo-list>
        <EditBox ref="editBox" @cancel="viewType = 'default'" @save="saveTodo($event)" v-show="viewType === 'edit'" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useWidget } from '@widget-js/vue3'
import { Todo, TodoListData, TodoUpdate } from '@/widgets/todo-list/model/TodoListData'
import { WidgetDataApi } from '@widget-js/core'
import { useElementSize } from '@vueuse/core'
import Color from 'color'
import EditBox from '@/widgets/todo-list/components/EditBox.vue'
import TodoList from '@/widgets/todo-list/components/TodoList.vue'
import FinishedTodoList from '@/widgets/todo-list/components/FinishedTodoList.vue'

type ViewType = 'default' | 'edit' | 'history'
const viewType = ref<ViewType>('default')

const props = defineProps({
  borderRadius: {
    type: Number,
    default: 22
  },
  backgroundColor: {
    type: String,
    default: '#F0F2F5'
  },
  color: {
    type: String,
    default: '#606266'
  }
})

const todos = reactive<Todo[]>([])
const finishedTodos = reactive<Todo[]>([])
const update = () => {
  widgetData.value.todoList = todos
  widgetData.value.finishedList = finishedTodos
  WidgetDataApi.saveByName(widgetData.value, { sendBroadcast: false })
}
const { widgetData } = useWidget(TodoListData, {
  loadDataByWidgetName: true,
  onDataLoaded: (data) => {
    console.log('onDataLoaded', widgetData.value)
    todos.splice(0, todos.length, ...widgetData.value.todoList)
    finishedTodos.splice(0, finishedTodos.length, ...widgetData.value.finishedList)
  }
})

const root = ref<HTMLElement>()

const editBox = ref<typeof EditBox>()
const { height } = useElementSize(root)
const saveTodo = (data: TodoUpdate) => {
  if (data.todo) {
    const findIndex = todos.findIndex((it) => it.id == data.todo!.id)
    if (findIndex > -1) {
      todos[findIndex].content = data.content
    }
  } else {
    todos.splice(0, 0, new Todo(data.content))
  }
  update()
  viewType.value = 'default'
}

const edit = (todo: Todo) => {
  editBox.value!.setTodo(todo)
  viewType.value = 'edit'
}

const borderRadiusPx = computed(() => props.borderRadius + 'px')

const borderColor = computed(() => {
  return new Color(props.color).alpha(0.3).toString()
})
</script>

<style scoped lang="scss">
.todo-list-widget {
  background-color: v-bind(backgroundColor);
  border-radius: v-bind(borderRadiusPx);
  font-weight: bold;
  width: 100%;
  height: 100%;

  .header {
    align-items: center;
    padding: 8px 16px;
    display: flex;
    border-bottom: v-bind(borderColor) 1px dashed;

    .title {
      flex-grow: 1;
      font-size: 16px;
      color: v-bind(color);
    }

    .actions {
      .icon {
        cursor: pointer;

        &:not(:last-child) {
          margin-right: 8px;
        }

        &:before {
          color: v-bind(color);
          font-size: 24px;
        }
      }
    }
  }

  .list-body {
    position: relative;

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
