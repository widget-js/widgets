<template>
  <ElCard @click="finish" body-style="padding:8px 4px" shadow="hover" class="todo-card">
    <div class="todo-item" :class="{ finished: finishedAt != undefined }">
      <!--      <ElCheckbox v-model="checkModel">-->
      <!--        <span></span>-->
      <!--      </ElCheckbox>-->
      <!--      <div class="todo" style="line-height: 1.2">-->
      <!--        <p>{{ todo.content }}</p>-->
      <!--      </div>-->
      <div class="checkbox">
        <input v-model="checkModel" type="checkbox" />
        <label for="01">{{ todo.content }}</label>
      </div>
      <div class="actions flex items-center justify-center gap-2">
        <div
          v-if="editable"
          @click.stop="edit"
          class="click-spot items-center flex justify-center"
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
import { computed } from 'vue'

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
const finishedAt = computed({
  get: () => {
    return props.todo.finishedAt
  },
  set: (value) => {
    props.todo.finishedAt = value
  }
})

const checkModel = computed({
  get: () => {
    return props.todo.finishedAt != undefined
  },
  set: (value) => {
    props.todo.finishedAt = value ? new Date().toISOString() : undefined
  }
})
const finish = () => {
  finishedAt.value = new Date().toISOString()
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

.todo-card{
  border-radius: 8px;
}
.todo {
  width: 75%;
}


.todo-item {
  padding: 4px 8px;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  display: flex;

  &:hover {
    .actions {
      opacity: 1;
    }
  }

  .actions {
    justify-items: center;
    place-items: center;
    margin-left: auto;
    opacity: 0;
  }
}

.checkbox {
  --background: #fff;
  --text: #414856;
  --check: var(--el-color-primary);
  --disabled: #c3c8de;
  --height: 180px;
  --border-radius: 10px;
  background: var(--background);
  flex: 1;
  border-radius: var(--border-radius);
  position: relative;
  display: flex;
  align-items: center;

  label {
    position: relative;
    cursor: pointer;
    display: grid;
    align-items: center;
    width: fit-content;
    transition: color 0.3s ease;
    margin-right: 20px;

    &::before,
    &::after {
      content: '';
      position: absolute;
    }

    &::before {
      height: 2px;
      width: 8px;
      left: -27px;
      background: var(--el-color-primary);
      border-radius: 2px;
      transition: background 0.3s ease;
    }

    &::after {
      height: 4px;
      width: 4px;
      top: 8px;
      left: -25px;
      border-radius: 50%;
    }
  }

  input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    height: 15px;
    width: 15px;
    outline: none;
    border: 0;
    margin: 0 15px 0 0;
    cursor: pointer;
    display: grid;
    align-items: center;
    margin-right: 20px;

    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 2px;
      margin-top: 2px ;
      background: var(--el-color-primary);
      border-radius: 2px;
    }

    &::before {
      width: 0;
      right: 60%;
      transform-origin: right bottom;
    }

    &::after {
      width: 0;
      left: 40%;
      transform-origin: left bottom;
    }

    &:checked {
      &::before {
        animation: check-01 0.4s ease forwards;
      }

      &::after {
        animation: check-02 0.4s ease forwards;
      }

      + label {
        color: var(--disabled);
        animation: move 0.3s ease 0.1s forwards;

        &::before {
          background: var(--disabled);
          animation: slice 0.4s ease forwards;
        }

        &::after {
          animation: firework 0.5s ease forwards 0.1s;
        }
      }
    }

  }


}
@keyframes move {
  50% {
    padding-left: 8px;
    padding-right: 0px;
  }

  100% {
    padding-right: 4px;
  }
}

@keyframes slice {
  60% {
    width: 100%;
    left: 4px;
  }

  100% {
    width: 100%;
    left: -2px;
    padding-left: 0;
  }
}

@keyframes check-01 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }

  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }

  51% {
    width: 0px;
    top: 8px;
    transform: rotate(45deg);
  }

  100% {
    width: 5px;
    top: 8px;
    transform: rotate(45deg);
  }
}

@keyframes check-02 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }

  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }

  51% {
    width: 0px;
    top: 8px;
    transform: rotate(-45deg);
  }

  100% {
    width: 10px;
    top: 8px;
    transform: rotate(-45deg);
  }
}

@keyframes firework {
  0% {
    opacity: 1;
    box-shadow: 0 0 0 -2px var(--el-color-primary), 0 0 0 -2px var(--el-color-primary),
      0 0 0 -2px var(--el-color-primary), 0 0 0 -2px var(--el-color-primary), 0 0 0 -2px var(--el-color-primary),
      0 0 0 -2px var(--el-color-primary);
  }

  30% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    box-shadow: 0 -15px 0 0px var(--el-color-primary), 14px -8px 0 0px var(--el-color-primary),
      14px 8px 0 0px var(--el-color-primary), 0 15px 0 0px var(--el-color-primary),
      -14px 8px 0 0px var(--el-color-primary), -14px -8px 0 0px var(--el-color-primary);
  }
}
</style>
