<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { supabase } from '@/api/supabase'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const signUpSuccess = ref(false)
const loading = ref(false)
function validateEmail(val: string) {
  return /\S[^\s@]*@\S+\.\S+/.test(val)
}
function validatePassword(val: string) {
  return /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{8,}$/i.test(val)
}

async function registerUser(email, password) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://widgetjs.cn',
    },
  })
  return error
}

async function register() {
  if (!validateEmail(email.value)) {
    ElMessage.error('请输入有效的邮箱')
    return
  }
  if (!validatePassword(password.value)) {
    ElMessage.error('密码需包含数字和字母，且长度不少于8位')
    return
  }
  if (password.value !== confirmPassword.value) {
    ElMessage.error('两次输入的密码不一致')
    return
  }
  try {
    loading.value = true
    const error = await registerUser(email.value, password.value)
    if (error) {
      ElMessage.error(`注册失败: ${error.message}`)
    }
    else {
      signUpSuccess.value = true
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <WidgetBaseDialog title="注册">
    <template #body>
      <div class="flex w-full h-full items-center justify-center">
        <el-result
          v-if="signUpSuccess"
          icon="success"
          title="邮件激活链接已发送"
          sub-title="请前往您的邮箱激活账号"
        />
        <el-form v-else class="w-full">
          <el-form-item>
            <el-input v-model="email" placeholder="邮箱" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="password" placeholder="密码（数字+字母，至少8位）" type="password" show-password />
          </el-form-item>
          <el-form-item>
            <el-input v-model="confirmPassword" placeholder="确认密码" type="password" show-password />
          </el-form-item>
          <el-button v-loading="loading" type="primary" style="width:100%" @click="register">
            发送激活链接
          </el-button>
        </el-form>
      </div>
    </template>
  </WidgetBaseDialog>
</template>

<style scoped lang="scss">
</style>
