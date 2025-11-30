import { createClient } from '@supabase/supabase-js'

const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzY0MDAwMDAwLCJleHAiOjE5MjE3NjY0MDB9.3nGFAW2q2bzxWmx1T-ycnmklITh9OcEvA1kZPXz4dBs'
const supabaseUrl = 'https://supabase.widgetjs.cn'
const supabase = createClient(supabaseUrl, anonKey)

function getStorageLink(fullPath: string) {
  return `https://supabase.widgetjs.cn/storage/v1/object/public/${fullPath}`
}
export { getStorageLink, supabase }
