<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { AppApi } from '@widget-js/core'
import { ref } from 'vue'

const email = useStorage('login-email', '')
const password = ref<string>('')

function signUp() {
  AppApi.showAppWindow('/auth/register', {
    width: 400,
    height: 320,
  })
}

function reset() {
  AppApi.showAppWindow('/auth/reset', {
    width: 400,
    height: 320,
  })
}

async function signIn() {
}
</script>

<template>
  <WidgetBaseDialog title="登录">
    <template #body>
      <div class="flex h-full flex-col items-center justify-center gap-6">
        <el-form class="w-full">
          <el-form-item>
            <el-input v-model="email" placeholder="邮箱" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="password" placeholder="密码" type="password" show-password />
          </el-form-item>
          <div class="flex flex-col gap-2">
            <el-button type="primary" @click="signIn">
              登录
            </el-button>
            <span />
            <div class="flex gap-2">
              <el-button class="flex-1" text @click="signUp">
                注册
              </el-button>
              <el-button class="flex-1" text @click="reset">
                找回密码
              </el-button>
            </div>
          </div>
        </el-form>
      </div>
    </template>
  </WidgetBaseDialog>
</template>

<style scoped lang="scss">

</style>
