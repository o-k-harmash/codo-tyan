export const range = (start: number, stop: number, step: number) =>
  Array.from(
    { length: Math.ceil((stop + 1 - start) / step) },
    (_, i) => start + i * step,
  )
