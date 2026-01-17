import type { Listener } from "./Listener"

export class Store<T> {
  private state: T
  private listeners: Set<Listener>

  constructor(initial: T) {
    this.state = initial
    this.listeners = new Set()
  }

  /** Получить текущее состояние */
  get(): T {
    return this.state
  }

  /** Обновить состояние через функцию(prev => next) */
  set(fn: (prev: T) => T): void {
    this.state = fn(this.state)
    this.listeners.forEach((l) => l())
  }

  /** Подписаться на изменения состояния */
  subscribe(listener: Listener): () => void {
    this.listeners.add(listener)
    // Возвращаем функцию отписки
    return () => this.listeners.delete(listener)
  }
}
