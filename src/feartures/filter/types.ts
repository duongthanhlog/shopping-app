import { SORTBY, ORDER } from './constant'
export type SortByType = (typeof SORTBY)[keyof typeof SORTBY]
export type OrderType = (typeof ORDER)[keyof typeof ORDER]
