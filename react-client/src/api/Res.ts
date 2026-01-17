import type { Abort } from "./Abort"
import type { Err } from "./Err"
import type { Ok } from "./Ok"

export type Res<T, E = Error> = Ok<T> | Err<E> | Abort
