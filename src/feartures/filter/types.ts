import { sort } from './constant'
export type SortWith = (typeof sort)[keyof typeof sort]
