<template>
  <div class="todo-item">
    <el-checkbox :checked="todo.isFinished()"><span class="todo">{{ todo.content }}</span></el-checkbox>
  </div>
</template>

<script lang="ts" setup>
import {Todo} from "@/widgets/todo-list/model/TodoListData";

const props = defineProps({
  todo: {
    type: Todo,
    required: true
  }
});
</script>

<style scoped lang="scss">
.el-checkbox.is-checked {

  .todo {
    color: #9c9c9c;
    text-decoration-line: line-through;
  }
}

.todo-item {
  padding: 4px 8px;
  border-radius: 8px;
  background-color: white;

  .action-three-two-one {
    width: 80%;
    margin-left: 10%;
    background: #FFFFFF;
    height: 20%;
    margin-top: 5%;
    border-radius: 7px 7px 7px 7px;
  }

  .action-three-box {
    width: 12%;
    height: 60%;
    margin-top: 4%;
    background: #FFFFFF;
    border-radius: 2px 2px 2px 2px;
    opacity: 1;
    border: 1px solid #DCDFE6;
    display: inline-block;
    position: relative;
  }

  .action-three-text {
    width: 65%;
    height: 60%;
    margin-top: 4%;
    margin-left: 5%;
    font-size: 1.5em;
    position: relative;
    display: inline-block;
    font-weight: bold;
  }
}
</style>
