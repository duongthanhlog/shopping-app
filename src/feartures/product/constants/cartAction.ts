export const CART_ACTION = {
    INCREASE: 'increase',
    DECREASE: 'decrease',
    DELETE: 'delete',
} as const

export type CartAction = (typeof CART_ACTION)[keyof typeof CART_ACTION]
