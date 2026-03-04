export const getPage = (current: number, total: number) => {
    const pages = []

    if (current > 3) pages.push(1)
    if (current > 4) pages.push('...')

    for (let i = current - 2; i <= current + 2; i++) {
        if (i > 0 && i <= total) {
            pages.push(i)
        }
    }
    if (current < total - 3) pages.push('...')
    if (current < total - 2) pages.push(total)
    return pages
}
