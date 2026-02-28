export type ToastType = 'success' | 'warning' | 'error' | ''

export interface ToastState {
    type: ToastType
    message: string
}

export interface ToastContextType {
    toast: ToastState | null
    showToast: (type: ToastType, message: string) => void
    hideToast: () => void
}
