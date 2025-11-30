<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { onMounted, ref, watch } from 'vue'
import { supabase } from '@/api/supabase'

const email = ref('')
const signUpSuccess = ref(false)
const loading = ref(false)
const sending = ref(false)
const countdown = useStorage('reset-countdown', 0)
function validateEmail(val: string) {
  return /\S[^\s@]*@\S+\.\S+/.test(val)
}

async function sendCode() {
  if (!validateEmail(email.value)) {
    ElMessage.error('请输入有效的邮箱')
    return
  }
  try {
    sending.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: 'widget://widgetjs.cn/password/reset',
      },
    })
    if (error) {
      ElMessage.error(`发送失败: ${error.message}`)
    }
    else {
      signUpSuccess.value = true
      countdown.value = 60
    }
  }
  finally {
    sending.value = false
  }
}

onMounted(() => {
  const interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1
    }
  }, 1000)

  watch(countdown, (newVal) => {
    if (newVal === 0) {
      clearInterval(interval)
    }
  })
})
</script>

<template>
  <WidgetBaseDialog title="邮箱登录">
    <template #body>
      <div class="flex w-full h-full items-center justify-center">
        <el-result
          v-if="signUpSuccess"
          icon="success"
          title="已发送登录链接"
          sub-title="请前往您的邮箱登录账号"
        />
        <el-form v-else class="w-full">
          <el-form-item>
            <el-input v-model="email" placeholder="邮箱" autocomplete="off" />
          </el-form-item>
          <el-button v-loading="loading" @click="sendCode">
            发送链接
          </el-button>
        </el-form>
      </div>
    </template>
  </WidgetBaseDialog>
</template>

<style scoped lang="scss">
</style>
