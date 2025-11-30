<script setup lang="ts">
import { User } from '@icon-park/vue-next'
import { useUser } from '@/composition/useUser'

defineProps({
  size: {
    type: String,
    default: 'default',
  },
})
const { avatar } = useUser()
</script>

<template>
  <el-avatar :src="avatar" :size="size">
    <User size="24" />
  </el-avatar>
</template>

<style scoped lang="scss">

</style>
