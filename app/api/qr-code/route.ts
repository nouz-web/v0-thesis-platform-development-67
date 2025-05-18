import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { sessionId, courseId, validityMinutes = 15 } = await request.json()

    if (!sessionId || !courseId) {
      return NextResponse.json({ error: "Session ID and Course ID are required" }, { status: 400 })
    }

    // Create a session if it doesn't exist
    const session = db.createSession({
      courseId,
      date: new Date(),
      startTime: new Date().toTimeString().split(" ")[0],
      endTime: new Date(Date.now() + 90 * 60000).toTimeString().split(" ")[0], // 90 minutes later
      type: "lecture",
    })

    // Generate QR code
    const qrCode = db.generateQRCode(session.id, validityMinutes)

    return NextResponse.json({
      success: true,
      qrCode: {
        id: qrCode.id,
        expiresAt: qrCode.expiresAt,
      },
      session: {
        id: session.id,
        date: session.date,
        startTime: session.startTime,
        endTime: session.endTime,
      },
    })
  } catch (error) {
    console.error("Error generating QR code:", error)
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}
