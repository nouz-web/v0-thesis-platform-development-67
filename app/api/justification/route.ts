import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { studentId, sessionId, reason, documentUrl } = await request.json()

    if (!studentId || !sessionId || !reason) {
      return NextResponse.json({ error: "Student ID, Session ID, and Reason are required" }, { status: 400 })
    }

    // Submit justification
    const justification = db.submitJustification({
      studentId,
      sessionId,
      reason,
      documentUrl: documentUrl || "",
    })

    return NextResponse.json({
      success: true,
      justification: {
        id: justification.id,
        submittedAt: justification.submittedAt,
        status: justification.status,
      },
    })
  } catch (error) {
    console.error("Error submitting justification:", error)
    return NextResponse.json({ error: "Failed to submit justification" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { justificationId, status, reviewedBy } = await request.json()

    if (!justificationId || !status || !reviewedBy) {
      return NextResponse.json({ error: "Justification ID, Status, and Reviewer ID are required" }, { status: 400 })
    }

    // Review justification
    const result = db.reviewJustification(justificationId, status, reviewedBy)

    return NextResponse.json({
      success: true,
      justification: {
        id: result.id,
        status: result.status,
        reviewedAt: result.reviewedAt,
      },
    })
  } catch (error) {
    console.error("Error reviewing justification:", error)
    return NextResponse.json({ error: "Failed to review justification" }, { status: 500 })
  }
}
