import { User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
  src?: string
  alt?: string
  className?: string
  size?: 'default' | 'sm' | 'lg'
}

export default function UserAvatar({
  src,
  alt,
  className,
  size = 'default',
}: UserAvatarProps) {
  return (
    <Avatar className={cn('cursor-pointer', className)} size={size}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="bg-transparent">
        <User className="h-5 w-5 text-white" />
      </AvatarFallback>
    </Avatar>
  )
}
