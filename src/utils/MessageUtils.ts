import { ElMessage } from 'element-plus'

export class MessageUtils {
  static success(message: string) {
    ElMessage({
      message,
      type: 'success',
    })
  }

  static warning(message: string) {
    ElMessage({
      message,
      type: 'warning',
    })
  }

  static error(message: string) {
    ElMessage({
      message,
      type: 'error',
    })
  }
}
