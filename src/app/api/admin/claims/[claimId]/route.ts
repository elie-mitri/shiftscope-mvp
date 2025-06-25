// src/app/api/admin/claims/[claimId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin'

// Import the same in-memory storage used in the main claims route
// In production, this would be stored in the database
declare global {
  var claimStatusUpdates: Record<string, 'pending' | 'approved' | 'rejected'> | undefined
}

if (!global.claimStatusUpdates) {
  global.claimStatusUpdates = {}
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ claimId: string }> }
) {
  try {
    const { claimId } = await params
    const supabase = await createServerClient()
    
    // Check authentication and admin status
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    if (!isAdmin(user)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { action } = body
    
    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be approve or reject' },
        { status: 400 }
      )
    }

    // For now, just log the action and update in-memory storage
    // In a real implementation, this would update the claim status in the database
    console.log(`Admin ${user.email} ${action}ed claim ${claimId}`)

    const newStatus = action === 'approve' ? 'approved' : 'rejected'
    
    // Store the status update in global memory
    global.claimStatusUpdates![claimId] = newStatus
    
    return NextResponse.json({
      message: `Claim ${action}ed successfully`,
      claim_id: claimId,
      new_status: newStatus
    })

  } catch (error) {
    console.error('Claim action error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}