import {
  Marquee as MarqueeComponent,
} from '@joycostudio/marquee/react'

export function Marquee({
  children,
  ...props
}: React.ComponentProps<typeof MarqueeComponent>) {
  return (
    <MarqueeComponent {...props}>
      <div className="flex items-center gap-8 px-4">{children}</div>
    </MarqueeComponent>
  )
}
