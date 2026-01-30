import { createPortal } from "react-dom"
import { type ReactNode } from "react"

interface OverlayProps {
  visible: boolean
  children?: ReactNode
}

export function Overlay({ visible, children }: OverlayProps) {
  return createPortal(
    <div className="overlay" data-visible={visible}>
      <div className="overlay__backdrop" />
      {children}
    </div>,
    document.body,
  )
}
