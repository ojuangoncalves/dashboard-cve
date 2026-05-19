import { createClient } from "@libsql/client"

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
   throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set") 
}

export const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
})

export async function initDB() {
    await db.execute(`
        CREATE TABLE IF NOT EXISTS sentNotifications (
            notificationPk TEXT PRIMARY KEY,
            chargeBoxName  TEXT NOT NULL,
            sentAt         DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )
}

interface NotificationEntry {
    pk: string
    name: string
    downAt: string
}

export async function insertNewAndGetThem(
    notifications: NotificationEntry[]
): Promise<NotificationEntry[]> {
    const newOnes: NotificationEntry[] = []

    for (const n of notifications) {
        const result = await db.execute({
            sql: `INSERT OR IGNORE INTO sentNotifications (notificationPk, chargeBoxName) VALUE (?, ?)`,
            args: [n.pk, n.name]
        })

        if (result.rowsAffected > 0) {
            newOnes.push(n)
        }
    }

    return newOnes
}