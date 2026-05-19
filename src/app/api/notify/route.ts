import { NextRequest, NextResponse } from "next/server"
import { initDB, insertNewAndGetThem } from "@/lib/db"
import { sendDownAlert, DownAsset } from "@/lib/mailer"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const notifications: ChargeBoxNotification[] = body.notifications

        if (!Array.isArray(notifications) || notifications.length === 0) {
            return NextResponse.json({ sent: 0, message: "Nenhuma notificação recebida" })
        }

        // Inicializa a tabela se ainda não existir
        await initDB()

        const newNotifications = await insertNewAndGetThem(
            notifications.map(n => ({
                pk: String(n.notificationPk),
                name: n.chargeBoxName,
                downAt: n.notificationTimestampDT
            }))
        )

        if (newNotifications.length === 0) {
            return NextResponse.json({
                sent: 0,
                message: "Todas as notificações já foram notificadas anteriormente"
            })
        }

        const assetsToAlert: DownAsset[] = newNotifications.map((n) => ({
            chargeBoxName: n.name,
            notificationPk: n.pk,
            downAt: n.downAt
        }))

        await sendDownAlert(assetsToAlert)

        return NextResponse.json({
            sent: newNotifications.length,
            message: `Email enviado para ${newNotifications.length} estações offline`
        })
    } catch (error) {
        console.error("[api/notify] Erro:", error)
        return NextResponse.json(
            { error: "Erro interno ao processar notificações" },
            { status: 500 }
        )
    }
}