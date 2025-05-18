import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET all announcements
export async function GET() {
  try {
    // In a real implementation, this would fetch from a database
    const announcements = db.getAnnouncements()
    return NextResponse.json(announcements)
  } catch (error) {
    console.error("Error fetching announcements:", error)
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 })
  }
}

// POST a new announcement
export async function POST(request: NextRequest) {
  try {
    const { title, content, priority, expiresAt } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // In a real implementation, this would save to a database
    const announcement = db.createAnnouncement({
      title,
      content,
      priority: priority || "normal",
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    })

    return NextResponse.json({ success: true, announcement })
  } catch (error) {
    console.error("Error creating announcement:", error)
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 })
  }
}

// DELETE an announcement
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Announcement ID is required" }, { status: 400 })
    }

    // In a real implementation, this would delete from a database
    const success = db.deleteAnnouncement(id)

    if (!success) {
      return NextResponse.json({ error: "Announcement not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting announcement:", error)
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 })
  }
}
