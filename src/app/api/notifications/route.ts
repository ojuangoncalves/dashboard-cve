import { NextRequest, NextResponse } from "next/server"
// import { createTransport } from 'nodemailer'

// import { prisma, smtpUser, smtpPass, smtpHost, smtpPort } from "../../../utils/util"


// Lida com as requisição POST na URL /api/notifications
export async function POST(req: NextRequest){
//     const notifications = await req.json().then(data => data.notifications)
//     const notificationsDisconnected = notifications.filter((n: chargeBoxNotification) => n.type == 'Disconnected')
//     const notificationsPK = notificationsDisconnected.map((notification: chargeBoxNotification) => notification.notificationPk)
//     let status = 200
//     let message = 'ok'

//     try {
//         const result = await prisma.chargeBoxNotification.findMany({ // consulta o banco de dados para verificar se as notifiações já foram cadastradas, filtrando através do Pk
//             where: {
//                 notificationPk: {
//                     in: notificationsPK
//                 },
//                 type: 'Disconnected'
//             }
//         })

//         if (result.length == 0) { // nenhuma notificação da última consulta na API está no banco de dados
//             await prisma.chargeBoxNotification.createMany({
//                 data: notificationsDisconnected,
//                 skipDuplicates: true
//             })
//             status = 201
//             message = 'Todas as notificações foram adicionadas ao banco de dados'
//         } else if (result.length > 0 && result.length < notificationsDisconnected.length) { // nem todas as notificações da última consulta da API estão no banco de dados
//             const notificationsInDB = new Set(result.map((n: chargeBoxNotification) => n.notificationPk))
//             const notificationsToInsert = notificationsDisconnected.filter((n :chargeBoxNotification) => !notificationsInDB.has(n.notificationPk))

//             await prisma.chargeBoxNotification.createMany({
//                 data: notificationsToInsert,
//                 skipDuplicates: true
//             })
//             status = 201
//             message = "Notificações adicionadas ao banco de dados."
//         }

//         await sendEmail()

//         return NextResponse.json({ message: message }, { status: status })
//     } catch (err) {
//         console.error(err)
//         return NextResponse.json({error: `${err}`}, { status: 500 })
//     } finally {
//         await prisma.$disconnect()
//     }

}

// async function sendEmail() {
//     try {
//         const notificationsToNotified = await prisma.chargeBoxNotification.findMany({ // consulta o banco de dados para saber sobre quais notificações ainda não foi enviado o email
//             where: {
//                 notified: null
//             }
//         })

//         const notificationsToNotifiedPK = notificationsToNotified.map((n: chargeBoxNotification) => n.notificationPk)

//         if (notificationsToNotified.length > 0) {
//             const transporter = createTransport({
//                 host: smtpHost,
//                 port: Number(smtpPort),
//                 secure: false,
//                 auth: {
//                     user: smtpUser,
//                     pass: smtpPass
//                 },
//                 tls: {
//                     rejectUnauthorized: false,
//                     checkServerIdentity: () => undefined
//                 },
//             })

//             let emailText = `<div style="width: 100%; text-align: center; font-family: Arial, sans-serif; padding: 20px;">
//             <h1 style="font-size: 24px; color: #333; margin-bottom: 20px;">Alarme de Monitoramento CVE - Balneário Shopping</h1>

//             <table style="margin: 0 auto; border-collapse: collapse; width: 80%; max-width: 600px;">
//                 <thead>
//                 <tr>
//                     <th style="border: 1px solid #ccc; background-color: #03A63C; color: white; padding: 10px; font-weight: bold;">
//                     Estação
//                     </th>
//                     <th style="border: 1px solid #ccc; background-color: #03A63C; color: white; padding: 10px; font-weight: bold;">
//                     Data da desconexão
//                     </th>
//                 </tr>
//                 </thead>
//                 <tbody>
//             `

//             notificationsToNotified.forEach((notification: chargeBoxNotification) => {
//                 emailText += `<tr>
//                 <td style="border: 1px solid #ccc; padding: 10px;">
//                     ${notification.chargeBoxName}
//                 </td>
//                 <td style="border: 1px solid #ccc; padding: 10px;">
//                     ${notification.notificationTimestampDT}
//                 </td>
//                 </tr>`
//             })

//             emailText += `</tbody>
//             </table>
//             </div>`

//             const mailOptions = {
//                 from: 'monitoramento.sva@intelbras.com.br',
//                 to: ['juan.nascimento@intelbras.com.br'],
//                 subject: `Alarme de Monitoramento CVE - Balneário Shopping - ${new Date().toLocaleDateString('pt-BR')}`,
//                 html: emailText
//             }

//             transporter.sendMail(mailOptions, async function(error, info) {
//                 if (error) {
//                     console.error(`Erro: ${error}`)
//                 } else {
//                     console.log(`Email enviado: ${info.response}`)
//                     try {
//                         await prisma.chargeBoxNotification.updateMany({
//                             where: {
//                                 notificationPk: { in: notificationsToNotifiedPK }
//                             },
//                             data: { notified: true }
//                         })
//                     } catch (err) {
//                         console.error(`Erro ao atualizar as notificações: ${err}`)
//                     }
//                 }
//             })
//         }
//     } catch (err) {
//         console.error(err)
//     } finally {
//         prisma.$disconnect()
//     }
// }
