export const getUserIdByToken = (token: string | null) => {
    try {
        return token.split('-')[2] ?? null
    } catch {
        return null
    }
}
