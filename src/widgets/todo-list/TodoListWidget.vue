<template>
  <div class="todo-list-widget" ref="root">
    <div class="header">
      <div class="title">
        {{ viewType === 'history' ? '历史记录' : '待办事项' }}
      </div>
      <div class="actions">
        <span class="icon mgc_back_line" v-if="viewType === 'history'" @click="viewType = 'default'"></span>
        <span class="icon mgc_history_line" v-else @click="viewType = 'history'"></span>
        <span class="icon mgc_add_circle_line" @click="viewType = 'add'"></span>
      </div>
    </div>
    <el-scrollbar :height="height - 48">
      <div class="body">
        <div class="list" v-show="viewType === 'default'">
          <transition-group name="list">
            <template v-for="(item,index) in list" :key="item.id">
              <todo-item @click.capture="todoItemClick(item)" :todo="item"></todo-item>
            </template>
          </transition-group>
        </div>
        <div class="list" v-show="viewType === 'history'">
          <template v-for="(item,index) in finishList">
            <todo-item @click="finishTodoItemClick(item)" :todo="item"></todo-item>
          </template>
        </div>
        <add-body @cancel="viewType = 'default'" @confirm="addTodo($event)" v-show="viewType === 'add'"></add-body>
      </div>
    </el-scrollbar>
    <audio ref="ding"></audio>
  </div>
</template>

<script lang="ts" setup>

import TodoItem from "./components/TodoItem.vue";
import {computed, ref} from "vue";
import AddBody from "@/widgets/todo-list/components/AddBody.vue";
import {useWidget} from "@widget-js/vue3";
import {Todo, TodoListData} from "@/widgets/todo-list/model/TodoListData";
import {WidgetApi} from "@widget-js/core";
import {useElementSize, useMediaControls, useWindowSize} from "@vueuse/core";
import Color from "color";

type ViewType = 'default' | 'add' | 'history';
const viewType = ref<ViewType>('default');

const list = ref<Todo[]>([])
const finishList = ref<Todo[]>([])

const props = defineProps({
  borderRadius: {
    type: Number,
    default: 22,
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

const {widgetData, widgetParams} = useWidget(TodoListData, {
  loadDataByWidgetName: true, onDataLoaded: () => {
    list.value = widgetData.value.todoList;
    finishList.value = widgetData.value.finishedList;
  }
});

if (widgetParams.preview) {
  const todo1 = new Todo("背单词");
  const todo2 = new Todo("游戏策划");
  const todo4 = new Todo("KOL合作方案评审");
  widgetData.value.todoList = [todo1, todo2, todo4]
}

const root = ref();
const {height} = useElementSize(root)
const {height: windowHeight} = useWindowSize()
const addTodo = (content: string) => {
  const todo = new Todo(content);
  widgetData.value.todoList.splice(0, 0, todo);
  WidgetApi.saveDataByName(widgetData.value, {sendBroadcast: false});
  viewType.value = 'default';
  list.value = widgetData.value.todoList;
}

const borderRadiusPx = computed(() => props.borderRadius + 'px');
const todoItemClick = (todo: Todo) => {
  widgetData.value.finishTodo(todo);
  list.value = widgetData.value.todoList;
  finishList.value = widgetData.value.finishedList;
  WidgetApi.saveDataByName(widgetData.value, {sendBroadcast: false});
  ringtonePlaying.value = true;
}

const finishTodoItemClick = (todo: Todo) => {
  widgetData.value.undoTodo(todo);
  list.value = widgetData.value.todoList;
  finishList.value = widgetData.value.finishedList;
  WidgetApi.saveDataByName(widgetData.value, {sendBroadcast: false});
}

const ding = ref()
const {playing: ringtonePlaying, duration} = useMediaControls(ding, {
  src: "./audio/ding.mp3",
})

const borderColor = computed(() => {
  return new Color(props.color).alpha(0.3).toString();
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

  .body {
    padding: 16px;

    .list {
      .todo-item {
        &:not(:last-child) {
          margin-bottom: 8px;
        }
      }
    }
  }

}

.list-enter-active, .list-leave-active {
  transition: all 0.3s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
