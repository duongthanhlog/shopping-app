import { cookies } from 'next/headers'
import jwt, { JwtPayload } from 'jsonwebtoken'

type TokenPayload = JwtPayload & {
    userId: string
}

export async function getUserIdFromToken() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return null

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as TokenPayload
        return decoded.userId
    } catch {
        return null
    }
}
