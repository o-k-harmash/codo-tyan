import { createPortal } from "react-dom"

export function Spinner({ dataVisible }: { dataVisible: boolean }) {
  return createPortal(
    <div className="page-loader" data-visible={dataVisible}>
      <div className="page-loader__spinner" />
    </div>,
    document.body,
  )
}
